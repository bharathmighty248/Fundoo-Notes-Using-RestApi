const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

class Auth {
    authentication = (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
                if (error) {
                    logger.error("Authorisation failed, Invalid user");
                    return res.status(401).send({ success: false,message:'Authorisation failed, Invalid user' });
                } else {
                    logger.info("token verified");
                    req.user = decodedToken;
                    next();
                }
            });
        } catch (err) {
            logger.error("Internal error, Authorization Not provided");
            return res.status(500).send({ success: false, message: 'Internal error, Authorization Not provided' });
        }
    };
}

module.exports = new Auth();
