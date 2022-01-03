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
    };

    updatenotes = (info, callback) => {
        noteModel.updateNote(info, (err,data) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, data);
            }
        })
    };

    deletenotes = (info, callback) => {
        noteModel.deleteNote(info, (err,data) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, data);
            }
        })
    }
}

module.exports = new Service();
