const User = require('../models/user');
const filterBody = require('../helpers/updateAuth');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require("bcryptjs");

module.exports = {
    loginFb : (req, res) =>{
        let authResponse = req.body
        console.log("=======1===========", authResponse)
        let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${authResponse.accessToken}`
        axios.get(url_user_info)
            .then(userFb =>{
                console.log("=======2===========", userFb)
                User.findOne({email : userFb.data.email})
                    .then(user=>{
                        console.log("=======C===========", user)
                      if(user!== null){
                        console.log("=======3===========", user)
                        let token = jwt.sign({id : user._id, role : user.role},  process.env.JWT_SECRET_KEY)
                        let userId = user._id;
                        res.status(200).json({
                            msg : `${user.name} has successfully logged in!`,
                            token,
                            userId,
                        })
                      } else {
                        console.log("=======MASUK SINI WOI===========")
                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(userFb.data.email, salt);
                        console.log("=======4===========", hash)
                        User.create({
                            fbId : userFb.data.id,
                            name : userFb.data.name, 
                            email: userFb.data.email,
                            password: hash
                        })
                            .then(newUser=>{
                                console.log("=======5===========", newUser)
                                let token = jwt.sign({id : newUser._id, role : newUser.role},   process.env.JWT_SECRET_KEY)
                                res.status(201).json({
                                    msg: `${newUser.name} is successfully registered and logged in`, 
                                    newUser,
                                    token,
                                })
                            })
                            .catch(err=>{
                                res.status(500).json(err)
                            })
                      }
                    })
                    .catch(err=>{
                        res.status(500).json(err)
                    })
            })
    },

    login: (req, res) => {
        const { email, password } = req.body;
        User.findOne({email : email})
            .then(user => {
                let isTrue = bcrypt.compareSync(password, user.password)
                
                if(isTrue){
                    let token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY)
                    res.status(200).json({
                        msg: `${user.name} is successfully logged in`, 
                        token
                    })
                }else{
                    res.status(400).json({
						mgs: "failed to login"
					});
                }   
            })
            .catch(err=>{
                res.status(400).json({
					msg: "check name and password"
				});
            })

    },

    signup : (req, res) =>{
        const {fullname, email, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        User.create({
            name : fullname,
            email : email,
            password: hash,
        })
            .then(user=>{
                let token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY)
                res.status(201).json({
                    msg: 'success',
                    user,
                    token
                })
            })
            .catch(err =>{
                console.log(err)
            });
    },

    getUsers : (req, res) =>{
        User.find()
        .populate("todos")
        .then(users => {
            res.status(200).json({
                msg: "success!", 
                users,
                
            });
        })
        .catch(err => {
            res.status(500).json({msg:err});
        })
    },

    newUser : (req, res) =>{
        const {fbId, name, email} = req.body;
        User.create({fbId, name, email})
        .then(newUser=>{
            res.status(201).json({
                msg: 'success', 
                newUser,
                
            })
        })
        .catch(err=>{
            res.status(500).json(err.errors)
        })
    },

    getUser : (req, res) =>{
        // User.findById(req.params.userId)
        User.findOne({_id: req.params.userId})
        .then(user=>{
            res.status(200).json({
                msg:'success', 
                user,
                
            })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }, 

    updateUser : (req, res) => {
        let allowedData = filterBody(req.body, ['name', 'email'])
        User.findOneAndUpdate({_id: req.params.userId}, allowedData, {new: true})
        .then(updatedUser=>{
            res.status(200).json({
                msg: 'success',
                updatedUser,
                
            })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }, 

    updateUserRole : (req , res) =>{
        User.findOneAndUpdate({_id: req.params.userId}, {role: req.body.role}, {new: true})
        .then(updatedUser=>{
            res.status(200).json({
                msg: 'success',
                updatedUser,
              
            })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    },

    deleteUser : (req, res) =>{
        User.remove({_id: req.params.userId})
        .then(()=>{
            res.status(200).json({
                msg : "Successfully deleted!",
                
            })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}