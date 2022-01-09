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
            userService.registerUser(user, (error) => {
                if (error) {
                    return res.status(409).json({
                        success: false,
                        message: 'User already exist',
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "User Registered, Please verify your Email to continue.."
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal error While Registering",
                data: null,
            });
        }
    };

    confirmRegister = (req,res) => {
        try {
            const data = {
                token: req.params.token
            };
            userService.confirmRegister(data, (error) => {
                if (error) {
                    return res.status(409).json({
                        success: false,
                        message: 'error',
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "Email verified successfully"
                    });
                }
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal error While Registering"
            });
        }
    };

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
                        message: 'Unable to login. Please verify your Email first or Please enter correct info',
                    });
                }
                const token = jwt.getToken(data);
                return res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                token,
                });
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal error while Login',
                data: null
            });
        }
    };

    socialLogin = (req,res) => {
        try {
            const profile = req.user.profile;
            const info = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                password: null,
            };
            userService.socialLogin(info,(error, data) => {
                if (error) {
                    return res.status(403).json({
                        success: false,
                        message: 'Unauthenticated',
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "User logged in successfully",
                        token:data,
                    });
                }
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal error while Login',
            });
        }
    };

    forgotpassword = (req, res) => {
        try {
            const user = {
                email: req.body.email,
            };
            userService.forgotpassword(user, (error) => {
                if (error) {
                    return res.status(404).json({
                        success: false,
                        message: "User doesn't exist",
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "Reset code sent to your registered email.."
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error While sending reset code to your email"
            });
        }
    }

    resetpassword = (req, res) => {
        try {
            const resetInfo = {
                email: req.body.email,
                resetcode: req.body.resetcode,
                newPassword: req.body.newPassword
            };
            const Validation = joiValidation.authResetPassword.validate(resetInfo);
            if (Validation.error) {
                return res.status(400).send({
                    success: false,
                    message: "Wrong Input"
                })
            }
            userService.resetpassword(resetInfo, (error) => {
                if (error) {
                    return res.status(401).json({
                        success: false,
                        message: 'Unable to reset password. Please enter correct info',
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: 'password reset successfull',
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal error while reset password'
            });
        }
    };
}

module.exports = new Controller();
