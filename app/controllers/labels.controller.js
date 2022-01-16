const labelservice = require('../service/labels.service');

class Controller {
    addLabel = (req, res) => {
        try {
            const info = {
                userId : req.user.id,
                email: req.user.email,
                labelName : req.body.labelName,
                noteId : req.body.noteId
            }
            labelservice.addLabel(info, (error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: error,
                        success: false
                    });
                } else {
                    return res.status(200).json({
                        message: "Label added successfully",
                        success: true,
                        data: {
                            labelName : data.labelName,
                            noteId: data.noteId
                        }
                    })
                }
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                success: false
            })
        }
    };

    updateLabel = (req,res) => {
        try {
            const info = {
                userId : req.user.id,
                email: req.user.email,
                labelName : req.body.labelName,
                noteId : req.body.noteId,
                newLabelName : req.body.newLabelName
            }
            labelservice.updateLabel(info,(error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: error,
                        success: false
                    });
                } else {
                    return res.status(200).json({
                        message: "Label Updated successfully",
                        success: data,
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
