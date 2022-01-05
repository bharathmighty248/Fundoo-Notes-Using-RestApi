const mongoose = require('mongoose');
const redisjs = require('../../utilities/redis');

const noteSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const notemodel = mongoose.model('note',noteSchema);

class noteModel {
    createNote = (info, callback) => {
        try {
            const note = new notemodel({
                email: info.email,
                title: info.title,
                description: info.description
            });
            note.save()
            .then(data => {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err, null);
            });
        } catch (error) {
            return callback(error, null);
        }
    };

    updateNote = async (info, callback) => {
        try {
            const userNotes = await notemodel.find({ email: info.email });
            if (userNotes.length === 0) {
                return callback(error,null);
            } else {
                const checkNotes = userNotes.filter((Element) => Element.id === info.noteId);
                if (checkNotes.length === 0) {
                    return callback(error,null);
                }
            }
            const { noteId, title, description } = info;
            const updates = { title,description }
            if (title !== undefined) {
                updates.title = title
            }
            if (description !== undefined) {
                updates.description = description
            }
            notemodel.findByIdAndUpdate(noteId, updates, { new: true })
            .then(data => {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err, null);
            });
        } catch (error) {
            return callback(error, null);
        }
    };

    deleteNote = async (info, callback) => {
        try {
            const userNotes = await notemodel.find({ email: info.email });
            if (userNotes.length === 0) {
                return callback(error,null);
            } else {
                const checkNotes = userNotes.filter((Element) => Element.id === info.noteId);
                if (checkNotes.length === 0) {
                    return callback(error,null);
                }
            }
            notemodel.findByIdAndDelete(info.noteId)
            .then(data => {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err, null);
            });
        } catch (error) {
            return callback(error, null);
        }
    };

    getNote = (info, callback) => {
        try {
            notemodel.find({ email: info.email },(error, data) => {
                if (data) {
                    return callback(null, data);
                } else if (!data) {
                    return callback(null, data);
                } else {
                    return callback(error, null);
                }
            });
        } catch (error) {
            return callback(error, null);
        }
    };

    getNotebyId = async (info, callback) => {
        try {
            const cachevalue = await redisjs.redisNotebyId(info.noteId);
            if (cachevalue) {
                const data = JSON.parse(cachevalue);
                return callback(null, data);
            }
            const userNotes = await notemodel.find({ email: info.email });
            if (userNotes.length === 0) {
                return callback(error,null);
            } else {
                const checkNotes = userNotes.filter((Element) => Element.id === info.noteId);
                if (checkNotes.length === 0) {
                    return callback(error,null);
                }
            }
            notemodel.findById(info.noteId)
            .then(data => {
                redisjs.setData(info.noteId,JSON.stringify(data));
                return callback(null, data);
            })
            .catch(err => {
                return callback(err, null);
            });
        } catch (error) {
            return callback(error, null);
        }
    };
}

module.exports = new noteModel();
