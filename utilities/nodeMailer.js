const nodemailer = require('nodemailer');
const resetcodemodel = require('../app/models/resetcode.model');

class forgotReset {
    sendEmail = (details, callback) => {
        try {
            const resetcode = Math.random().toString(36).substring(2,12);
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAIL_SENDER,
                    pass: process.env.PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            transporter.sendMail({
                from: process.env.MAIL_SENDER,
                to: details,
                subject: "Your Password Reset Code",
                text: `Use this code to reset your password: ${resetcode} `
            });
            const code = new resetcodemodel({ email : details,resetcode });
            code.save()
            .then(data => {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err, null);
            });
        } catch (error) {
            return callback(error, null);
        }
    }
}

module.exports = new forgotReset();
