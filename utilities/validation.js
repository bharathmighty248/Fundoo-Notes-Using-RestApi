const joi = require('joi');

class joiValidation {
    authRegister = joi.object({
        firstName: joi.string().min(2).required().pattern(new RegExp('[A-Za-z]{2,}')),
        lastName: joi.string().min(2).required().pattern(new RegExp('[A-Za-z]{2,}')),
        email: joi.string().required().pattern(new RegExp('[a-zA-Z]+[+_.-]{0,1}[0-9a-zA-Z]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3}){0,1}')),
        password: joi.string().required().pattern(new RegExp('[A-Za-z]{3,}[$&=?@#|*%!]{1,}[0-9]{1,}'))
    })

    authLogin = joi.object({
        email: joi.string().required().pattern(new RegExp('[a-zA-Z]+[+_.-]{0,1}[0-9a-zA-Z]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3}){0,1}')),
        password: joi.string().required().pattern(new RegExp('[A-Za-z]{3,}[$&=?@#|*%!]{1,}[0-9]{1,}'))
    })

    authResetPassword = joi.object({
        email: joi.string().required().pattern(new RegExp('[a-zA-Z]+[+_.-]{0,1}[0-9a-zA-Z]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3}){0,1}')),
        newPassword: joi.string().required().pattern(new RegExp('[A-Za-z]{3,}[$&=?@#|*%!]{1,}[0-9]{1,}')),
        resetcode: joi.string().required().pattern(new RegExp('[0-9a-zA-Z]'))
    })
}

module.exports = new joiValidation();
