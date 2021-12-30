const userModel = require('../models/user.model');

class userService {
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, data);
            }
        });
    }

    userLogin = (InfoLogin, callback) => {
        userModel.loginUser(InfoLogin, (error, data) => {
            if (error) {
                return callback(error, null);
            } else {
                return callback(null, data);
            }
        });
    }

    forgotpassword = async (user) => {
        const success = await userModel.forgotpassword(user);
        if (!success) {
            return false;
        }
        return true;
    }

    resetpassword = async (user) => {
        const success = await userModel.resetpassword(user);
        if (!success) {
            return false;
        }
        return true;
    }
}

module.exports = new userService();
