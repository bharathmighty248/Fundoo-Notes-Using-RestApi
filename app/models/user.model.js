const mongoose = require('mongoose');

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

        newUser.save()
        .then(data => {
            callback(null, data);
        })
        .catch(err => {
            callback({ message: "Error while Storing User Details in DataBase" }, null);
        });
    };
}
module.exports = new userModel();