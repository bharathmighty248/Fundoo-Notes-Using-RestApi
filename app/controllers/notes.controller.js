const noteservice = require('../service/notes.service');

class Controller {
    createnotes = (req, res) => {
        try {
            if (!req.body.title || !req.body.description) {
                return res.status(400).send({
                    success: false,
                    message: "Please fill details..! Note can not be empty",
                });
            }
            const info = {
                email: req.user.email,
                title: req.body.title,
                description: req.body.description
            };
            noteservice.createnotes(info,(error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: 'error while creating note',
                        success: false
                    });
                } else {
                    return res.status(200).json({
                        message: "Note created successfully",
                        success: true,
                        data
                    })
                }
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                success: false
            })
        }
    }
}

module.exports = new Controller();
