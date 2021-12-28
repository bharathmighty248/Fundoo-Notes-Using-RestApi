const jwt = require('jsonwebtoken');

class GetToken {
    getToken = (details, callback) => {
        try {
            const token = jwt.sign({
                id: details._id,
                email: details.email
            }, process.env.JWT_SECRET)
            return token;
        } catch (error) {
            return callback(error,null)
        }
    }
}
module.exports = new GetToken();
