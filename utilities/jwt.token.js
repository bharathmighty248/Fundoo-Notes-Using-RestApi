const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

class GetToken {
    getToken = (details, callback) => {
        try {
            const token = jwt.sign({
                id: details._id,
                email: details.email
            }, process.env.JWT_SECRET)
            logger.info("Token generated");
            return token;
        } catch (error) {
            logger.error("Internal error");
            return callback(error,null)
        }
    }
}
module.exports = new GetToken();
