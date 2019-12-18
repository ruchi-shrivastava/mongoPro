// const mongoose = require('mongoose');

// // const Schema = mongoose.Schema;

// // before authentication
// // const userSchema = new Schema ({ 
// //     username: {
// //         type: String,
// //         required: true
// //     },

// //     password: {
// //         type: String,
// //         required: true
// //     }
// // })

// function validateUser(user) {
//     const schema = {
//         username: joi.string()
//         .min(5)
//         .max(255)
//         .required()
//         .username(),
//        password: joi.string()
//        .min(3)
//        .max(255)
//        .required() 
//     };

//     return joi.validate(user, schema);
// }

// module.exports = mongoose.model('User', userSchema);
// exports.User = User;
// exports.validate = validateUser;



const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
 const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  token: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function(next){
  const user = this
  if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})


userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ username: user.username.toString() }, "radhey", {
    expiresIn: "7 days"
  });
  user.token = token
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string()
      .min(5)
      .max(255)
      .required()
      .username(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;

