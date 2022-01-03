const mongoose = require('mongoose');

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
    }
}

module.exports = new noteModel();
