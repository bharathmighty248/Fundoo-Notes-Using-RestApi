const userService = require('../service/user.service');
const joiValidation = require('../../utilities/validation');
const jwt = require('../../utilities/jwt.token');

class Controller {
    register = (req, res) => {
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };
            const Validation = joiValidation.authRegister.validate(user);
            if (Validation.error) {
                return res.status(400).send({
                    success: false,
                    message: "Wrong Input"
                })
            }
            userService.registerUser(user, (error, data) => {
                if (error) {
                    return res.status(409).json({
                        success: false,
                        message: 'User already exist',
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "User Registered",
                        data,
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error While Registering",
                data: null,
            });
        }
    }

    login = (req, res) => {
        try {
            const userLoginInfo = {
                email: req.body.email,
                password: req.body.password
            };
            const Validation = joiValidation.authLogin.validate(userLoginInfo);
            if (Validation.error) {
                return res.status(400).send({
                    success: false,
                    message: "Wrong Input"
                })
            }
            userService.userLogin(userLoginInfo, (error, data) => {
                if (error) {
                    return res.status(401).json({
                        success: false,
                        message: 'Unable to login. Please enter correct info',
                    });
                }
                const token = jwt.getToken(data);
                return res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                data,
                token,
                });
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error while Login',
                data: null
            });
        }
    };

    forgotpassword = (req, res) => {
        try {
            const user = {
                email: req.body.email,
            };
            userService.forgotpassword(user, (error, data) => {
                if (error) {
                    return res.status(404).json({
                        success: false,
                        message: "User doesn't exist",
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "Reset code sent to your registered email..",
                        data,
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error While sending reset code to your email",
                data: null,
            });
        }
    }
}

module.exports = new Controller();
