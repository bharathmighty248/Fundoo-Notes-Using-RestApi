const notes = require('../controllers/notes.controller');
const auth = require('../../utilities/auth');

module.exports = (app) => {
    app.post('/createnote',auth.authentication, notes.createnotes);
    app.put('/updatenote',auth.authentication, notes.updatenotes);
    app.delete('/deletenote',auth.authentication, notes.deletenotes);
    app.get('/getnotes',auth.authentication, notes.getnotes);
    app.get('/getnotebyId',auth.authentication, notes.getnotebyId);
}
