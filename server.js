const express = require('express');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const dbConfig = require('./config/database.config');
const logger = require('./config/logger');

const app = express();

app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.json());

dbConfig.dbConnection();

app.get('/', (req,res) => {
    res.json({ message: "Welcome to Fundoo-Notes Application. Take notes quickly. Organize and keep track of all your notes." });
});

app.use(passport.initialize());
require('./utilities/passport');

require('./app/routes/user.routes')(app);
require('./app/routes/notes.routes')(app);

app.listen(process.env.PORT, () => {
    logger.info("Server is listening on port 3000");
});

module.exports = app;
