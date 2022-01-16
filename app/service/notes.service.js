const noteModel = require('../models/notes.model').noteModel;

class Service {
    createnotes = (info, callback) => {
        noteModel.createNote(info, (err,data) => {
            if (err) {
                return callback(err, null);
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
    };

    getnotes = (info, callback) => {
        noteModel.getNote(info, (err,data) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, data);
            }
        })
    };

    getnotebyId = (info, callback) => {
        noteModel.getNotebyId(info, (err,data) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, data);
            }
        })
    }
}

module.exports = new Service();
