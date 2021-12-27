const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');

const app = express();

app.use(express.json());

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req,res) => {
    res.json({"message": "Welcome to Fundoo-Notes Application. Take notes quickly. Organize and keep track of all your notes."});
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
