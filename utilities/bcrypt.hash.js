const bcrypt = require('bcryptjs');
const logger = require('../config/logger');

class bcryptPassword {
    hashpassword = (details, callback) => {
        try {
            bcrypt.hash(details, 10, (err, hash) => {
                if (err) {
                    logger.error("password not hashed");
                    return callback(err, null);
                }
                logger.info("password hashing done");
                return callback(null, hash);
            })
        } catch (error) {
            logger.error("Internal error")
            return callback(error,null)
        }
    }
}
module.exports = new bcryptPassword()
