const bcrypt = require('bcryptjs');

class bcryptPassword {
    hashpassword = async (details) => {
        try {
            const hash = await bcrypt.hash(details, 10);
            if (hash) {
                return hash;
            }
            return false;
        } catch (error) {
            return (error,null);
        }
    }
}
module.exports = new bcryptPassword()
