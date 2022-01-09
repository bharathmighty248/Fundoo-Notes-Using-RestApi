const passport = require('passport');
const user = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/register', user.register);
    app.get('/confirmregister/:token', user.confirmRegister);
    app.post('/login', user.login);
    app.get('/login/google', passport.authenticate("google", { scope: ["profile", "email"], prompt: "consent", includeGrantedScopes: true }));
    app.get('/login/google/callback', passport.authenticate('google'), user.socialLogin);
    app.post('/forgotpassword',user.forgotpassword);
    app.post('/resetpassword',user.resetpassword);
}
