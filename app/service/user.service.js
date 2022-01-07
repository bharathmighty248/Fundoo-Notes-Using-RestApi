const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const jwtToken = require('../../utilities/jwt.token');
const rabbitmq = require('../../utilities/rabbitmq');
const nodemailer = require('../../utilities/nodeMailer');

class userService {
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                const token = jwtToken.getToken(data);
                rabbitmq.publisher(data, data.email);
                nodemailer.sendVerifyEmail(data, token);
                return callback(null, data);
            }
        });
    };

    confirmRegister = (data, callback) => {
        const decodedToken = jwt.verify(data.token, process.env.JWT_SECRET);
        if (decodedToken) {
            rabbitmq.subscriber(decodedToken.email)
            .then((info) => {
                userModel.confirmRegister(JSON.parse(info), (error, data) => {
                    if (data) {
                        nodemailer.sendConfirmEmail(data);
                        return callback(null, data);
                    } else {
                        return callback(error, null);
                    }
                })
            })
        }
    };

    userLogin = (InfoLogin, callback) => {
        userModel.loginUser(InfoLogin, (error, data) => {
            if (error) {
                return callback(error, null);
            } else {
                return callback(null, data);
            }
        });
    }

    forgotpassword = (user, callback) => {
        userModel.forgotpassword(user, (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, data);
            }
        });
    }

    resetpassword = (user, callback) => {
        userModel.resetpassword(user, (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, data);
            }
        });
    }
}

module.exports = new userService();
