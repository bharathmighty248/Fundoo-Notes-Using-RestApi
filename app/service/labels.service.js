const labelmodel = require('../models/labels.model');

class Service {
    addLabel = (info, callback) => {
        labelmodel.addLabel(info, (error,data) => {
            if (error) {
                return callback(error, null);
            } else {
                return callback(null, data);
            }
        })
    }
}

module.exports = new Service();
