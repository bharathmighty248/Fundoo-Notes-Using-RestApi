const notes = require('../controllers/notes.controller');
const auth = require('../../utilities/auth');

module.exports = (app) => {
    app.post('/createnote',auth.authentication, notes.createnotes);
}
