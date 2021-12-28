const express = require('express');
require('dotenv').config();
const dbConfig = require('./config/database.config');

const app = express();

app.use(express.json());

dbConfig.dbConnection();

app.get('/', (req,res) => {
    res.json({ message: "Welcome to Fundoo-Notes Application. Take notes quickly. Organize and keep track of all your notes." });
});

require('./app/routes/user.routes')(app);

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port 3000");
});
