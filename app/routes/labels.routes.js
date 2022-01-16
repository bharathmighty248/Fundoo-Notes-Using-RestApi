const labels = require('../controllers/labels.controller');
const auth = require('../../utilities/auth');

module.exports = (app) => {
    app.post('/addlabel',auth.authentication, labels.addLabel);
}
