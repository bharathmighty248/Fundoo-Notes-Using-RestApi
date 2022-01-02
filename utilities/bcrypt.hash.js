const bcrypt = require('bcryptjs');

class bcryptPassword {
    hashpassword = (details, callback) => {
        try {
            bcrypt.hash(details, 10, (err, hash) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, hash);
            })
        } catch (error) {
            return callback(error,null)
        }
    }
}
module.exports = new bcryptPassword()
