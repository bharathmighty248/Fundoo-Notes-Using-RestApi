const user = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/register', user.register);
    app.get('/confirmregister/:token', user.confirmRegister);
    app.post('/login', user.login);
    app.post('/forgotpassword',user.forgotpassword);
    app.post('/resetpassword',user.resetpassword);
}
