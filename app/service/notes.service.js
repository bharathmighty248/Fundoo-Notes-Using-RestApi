const noteModel = require('../models/notes.model');

class Service {
    createnotes = (info, callback) => {
        noteModel.createNote(info, (err,data) => {
            if (err) {
                return callback(error, null);
            } else {
                return callback(null, data);
            }
        })
    }
}

module.exports = new Service();
