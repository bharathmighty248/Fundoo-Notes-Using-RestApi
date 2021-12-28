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
}

module.exports = new userService();
