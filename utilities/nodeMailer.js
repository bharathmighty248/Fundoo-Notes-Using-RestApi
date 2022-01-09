const nodemailer = require('nodemailer');
const resetcodemodel = require('../app/models/resetcode.model');
const logger = require('../config/logger');

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

class nodeMailer {
    sendResetEmail = (details, callback) => {
        try {
            const resetcode = Math.random().toString(36).substring(2,12);
            transporter.sendMail({
                from: "'Fundoo Notes'<fundoo-account@fundoonotes.com>",
                to: details,
                subject: "Your Password Reset Code",
                text: `Use this code to reset your password: ${resetcode} `
            });
            logger.info("Reset Mail sent");
            const code = new resetcodemodel({ email : details,resetcode });
            code.save()
            .then(data => {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err, null);
            });
        } catch (error) {
            logger.error("internal error");
            return callback(error, null);
        }
    };

    sendVerifyEmail = (details,token, callback) => {
        try {
            const link = `http://localhost:${process.env.PORT}/confirmregister/${token}`;
            transporter.sendMail({
                from: "'Fundoo Notes'<fundoo-account@fundoonotes.com>",
                to: details.email,
                subject: "Verify Your Fundoo Notes Email Address",
                text: `Hello ${details.firstName}`,
                html: `<h2>Email Address Verification</h2> 
                <b>
                <p>Secure and Confirm Your Registration by verifying your email</p>
                <button href="${link}"> <a href="${link}">Verify Email</a></button>
                </b>`
            });
            logger.info("verification email sent");
        } catch (error) {
            logger.error("Internal error");
            return callback(error, null);
        }
    };

    sendConfirmEmail = (details, callback) => {
        try {
            transporter.sendMail({
                from: "'Fundoo Notes'<fundoo-account@fundoonotes.com>",
                to: details.email,
                subject: "Email Confirmation",
                text: `Hello ${details.firstName},
                Thankyou for confirming your email. Now You can use Fundoo Notes Securely..`,
            });
            logger.info("confirmation mail sent");
        } catch (error) {
            logger.error("Internal error");
            return callback(error, null);
        }
    }
}

module.exports = new nodeMailer();
