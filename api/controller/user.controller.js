const userService = require('../services/user.service');
const bcrypt = require("bcrypt");
const  { User, validate } = require("../models/user.model");

exports.LoginUser = async (req, res, next) => {
    console.log("result")
    try {
        let user = User.findOne({ username: req.body.username })
        .exec()
        .then(async result => {
            console.log("result");
            if (result) {
                console.log("result", result);
                bcrypt.compare(req.body.password, result.password,async function(err, response)
                {
                    if (response) {
                        res.send({
                            status: 200,
                            message: "User Authenticated",
                            token: result.token
                        });
                    } else {
                        res.send({
                            status: 500,
                            message: "Username or Password is Invalid"
                        });
                    }
                });
            } else {
                res.send({ status: 500, message: "Username or Password is Invalid"});
            }
        })
        .catch(err => {
            console.log(err);
        });
    } catch(error) {
        res.status(400).send();
    }
};

exports.AddUser = async (req, res, next) => {
    const user = new User(req.body);
    try {
      const token = await user.generateAuthToken();
      res.status(201).send({ user });
    } catch (e) {
      res.status(400).send(e);
    }
  };

exports.getUser = async (req,res, next) => {
    try {
        let response = await userService.getUser();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error:error});
    }
    
}

exports.updateUser = async (req,res, next) => {
    try {
        let response = await userService.updateUser(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error:error});
    }
    
}

exports.deleteUser = async (req,res, next) => {
    try {
        let response = await userService.deleteUser(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error:error});
    }
    
}