const notes = require('../controllers/notes.controller');
const auth = require('../../utilities/auth');

module.exports = (app) => {
    app.post('/createnote',auth.authentication, notes.createnotes);
    app.put('/updatenote/:noteId',auth.authentication, notes.updatenotes);
    app.delete('/deletenote/:noteId',auth.authentication, notes.deletenotes);
    app.get('/getnotes',auth.authentication, notes.getnotes);
    app.get('/getnotebyId/:noteId',auth.authentication, notes.getnotebyId);
}
