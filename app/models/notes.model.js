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
    }
}

module.exports = new noteModel();
