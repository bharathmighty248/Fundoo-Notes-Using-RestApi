const jwt = require('jsonwebtoken');

class Auth {
    authentication = (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
                if (error) {
                    return res.status(401).send({ success: false,message:'Authorisation failed, Invalid user' });
                } else {
                    req.user = decodedToken;
                    next();
                }
            });
        } catch (err) {
            return res.status(500).send({ success: false, message: 'Internal error, Authorization Not provided' });
        }
    };
}

module.exports = new Auth();
