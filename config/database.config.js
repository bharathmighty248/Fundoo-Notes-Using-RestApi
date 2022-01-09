const mongoose = require('mongoose');
const logger = require('./logger');

exports.dbConnection = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true
    }).then(() => {
        logger.info("Successfully connected to the database");
    }).catch(err => {
        logger.error('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
};
