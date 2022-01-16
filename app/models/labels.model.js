const mongoose = require('mongoose');
const notemodel = require('./notes.model').notemodel;

const labelSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        noteId: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'note'
            }]
        },
        labelName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const labelmodel = mongoose.model("label",labelSchema);

class labelModel {
    addLabel = async (info, callback) => {
        try {
            const checkNotes = await notemodel.find({ email: info.email,_id: info.noteId });
            if (checkNotes.length === 0) {
                return callback("note doesn't Exist", null);
            }
            const checkLabels = await labelmodel.find({ userId: info.userId,labelName: info.labelName });
            if (checkLabels.length !== 0) {
                labelmodel.findOneAndUpdate({ userId:info.userId,labelName:info.labelName }, { $addToSet: { noteId: info.noteId } })
                .then((data) => {
                    return callback(null, data);
                })
            } else {
                const label = new labelmodel({
                    userId: info.userId,
                    noteId: info.noteId,
                    labelName: info.labelName
                });
                label.save()
                .then(data => {
                    return callback(null, data);
                })
            }
        } catch (error) {
            return callback("Something went wrong", null);
        }
    };

    updateLabel = async (info, callback) => {
        try {
            const checkLabel = await labelmodel.find({ userId: info.userId,labelName: info.labelName });
            if (checkLabel.length !== 0) {
                if (info.noteId !== null) {
                    await labelmodel.findOneAndUpdate({ userId: info.userId,labelName: info.labelName },{ $pull: { noteId: info.noteId } });
                }
                if (info.labelName && info.newLabelName !== null) {
                    await labelmodel.findOneAndUpdate({ userId: info.userId,labelName: info.labelName },{ labelName: info.newLabelName });
                    await labelmodel.findOneAndDelete({ userId: info.userId,labelName: info.newLabelName,noteId:{ $exists: true, $size: 0 } });
                }
                await labelmodel.findOneAndDelete({ userId: info.userId,labelName: info.labelName,noteId:{ $exists: true, $size: 0 } });
                return callback(null, true);
            } else {
                return callback("Label doesn't Exist", null);
            }
        } catch (error) {
            return callback("Something went wrong", null);
        }
    }
}

module.exports = new labelModel();
