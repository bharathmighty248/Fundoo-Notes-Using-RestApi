const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.json({"message": "Welcome to Fundoo-Notes Application. Take notes quickly. Organize and keep track of all your notes."});
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
