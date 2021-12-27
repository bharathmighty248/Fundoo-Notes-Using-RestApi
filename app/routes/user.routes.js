const user = require('../controllers/user.controller.js');

module.exports = (app) => {
    app.post('/register', user.register);
    app.post('/login', user.login);
}