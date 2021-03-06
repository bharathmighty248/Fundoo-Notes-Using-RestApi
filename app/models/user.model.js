const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bcryptPassword = require('../../utilities/bcrypt.hash');
const nodemailer = require('../../utilities/nodeMailer');
const resetcodemodel = require('./resetcode.model');

const UserSchema = new mongoose.Schema(
    {
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
    },
    verified: {
        type: Boolean,
        default: false
    },
    googleVerified: {
        type: Boolean
    }
},
    {
        timestamps: true,
    }
)

const user = mongoose.model('user', UserSchema);

class userModel {
    registerUser = (userDetails, callback) => {
        const newUser = new user();
        newUser.firstName = userDetails.firstName;
        newUser.lastName = userDetails.lastName;
        newUser.email = userDetails.email;
        newUser.password = userDetails.password;

        bcryptPassword.hashpassword(userDetails.password, (error, data) => {
            if (data) {
              newUser.password = data;
              newUser.save()
                .then(data => {
                    return callback(null, data);
                })
                .catch(err => {
                    return callback(err, null);
                });
            } else {
                return callback(error, null);
            }
        });
    };

    confirmRegister = (data, callBack) => {
        user.findOneAndUpdate({ email:data.email },{ verified: true }, (error,data) => {
            if (error) {
                return callBack(error, null);
            } else {
                return callBack(null, data);
            }
        })
    };

    loginUser = (loginData, callBack) => {
        user.findOne({ email: loginData.email,verified: true }, (error, data) => {
            if (data) {
                bcrypt.compare(loginData.password, data.password, (error,validate) => {
                    if (!validate) {
                        return callBack(error + 'Invalid Password', null);
                    } else {
                        return callBack(null, data);
                    }
                })
            } else if (!data) {
                return callBack(error + "Invalid Credential", null);
            } else {
                return callBack(error, null);
            }
        });
    };

    socialLogin = (userdata, callBack) => {
        user.findOne({ email: userdata.email }, (error, data) => {
            if (data) {
                return callBack(null, data);
            } else if (data === null) {
                const newdata = new user({
                    firstName: userdata.firstName,
                    lastName:userdata.lastName,
                    email: userdata.email,
                    password: userdata.password,
                    googleVerified: true
                });
                newdata.save();
                return callBack(null, newdata);
            } else {
                return callBack(error, null);
            }
        })
    }

    forgotpassword = (data, callBack) => {
        user.findOne({ email: data.email }, (error, data) => {
            if (data) {
                nodemailer.sendResetEmail(data.email, (err, data) => {
                    if (err) {
                        return callBack(err, null);
                    } else {
                        return callBack(null, data)
                    }
                });
            } else if (!data) {
                return callBack(error + "Invalid Credential", null);
            } else {
                return callBack(error, null);
            }
        });
    }

    resetpassword = (Data, callBack) => {
        resetcodemodel.findOne({ email: Data.email, resetcode: Data.resetcode }, (error,data) => {
            if (data) {
                bcryptPassword.hashpassword(Data.newPassword, (error, data) => {
                    if (data) {
                        user.updateOne({ email: Data.email }, { $set: { password: data } })
                            .then(data => {
                                return callBack(null, data);
                            })
                            .catch(err => {
                                return callBack(err, null);
                            });
                    } else {
                        return callBack(error, null);
                    }
                });
            } else if (!data) {
                return callBack(error + "Invalid Credential", null);
            } else {
                return callBack(error, null);
            }
        })
    };
}
module.exports = new userModel();
