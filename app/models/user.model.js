const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bcryptPassword = require('../../utilities/bcrypt.hash');

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
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
},
    {
        timestamps: true,
    })

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

    loginUser = (loginData, callBack) => {
        user.findOne({ email: loginData.email }, (error, data) => {
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
    }
}
module.exports = new userModel();
