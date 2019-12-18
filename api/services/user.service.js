const userModel = require("../models/user.model");
const mongoose = require("mongoose")

module.exports = {

    loginUser: async body => {
        const user = await userModel.findById(req.user._id).select("-password");
        res.send(user);
    },

    // AddUser: async body => {
    //     let user = new userModel({
    //         username: body.username,
    //         password: body.password,
    //     });

    //     try{
    //         return user.save().then(async result => {
    //             if (result) {
    //                 return {
    //                     status: 200,
    //                     message: "success"
    //                 };
    //             }
    //         });
    //     } catch (error) {
    //         return {
    //             status: 500,
    //             message: "failed," + error
    //         };
    //     }
    // },

    getUser: async  => {
        console.log("usermodel", userModel);
        

        try{
            return userModel.User.find().then(async result => {
                if (result) {
                    return {
                        status: 200,
                        message: "success",
                        data: result
                    };
                }
            });
        } catch (error) {
            return {
                status: 500,
                message: "failed," + error
            };
        }
    },

    updateUser: async body => {
        console.log("body", body);
        

        
        

        try{
            return userModel.User.findOneAndUpdate({_id: mongoose.Types.ObjectId(body._id)}, { $set: { username: body.username }}).exec().then(async result => {
                console.log("result", result);
                
                if (result) {

                    return {
                        status: 200,
                        message: "success"
                    };
                }
        });
        } catch (error) {
            return {
                status: 500,
                message: "failed," + error
            };
        }
    },

    deleteUser: async body => {
        console.log("body", body);
        

        try{
            return userModel.User.find({_id: mongoose.Types.ObjectId(body._id)}).remove().then(async result => {
                if (result) {
                    return {
                        status: 200,
                        message: "success"
                    };
                }
        });
        } catch (error) {
            return {
                status: 500,
                message: "failed," + error
            };
        }
    },




    NewUser: async body => {

    }
};