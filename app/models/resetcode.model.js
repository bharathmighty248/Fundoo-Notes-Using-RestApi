const mongoose = require('mongoose');

const codeSchema = mongoose.Schema({
    email:
        { type: String },
    resetcode:
        { type: String },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expireAfterSeconds: 180 },
    },
});

module.exports  = mongoose.model('resetcode', codeSchema);
