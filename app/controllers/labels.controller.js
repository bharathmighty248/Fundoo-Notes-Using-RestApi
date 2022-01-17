const labelservice = require('../service/labels.service');
const redisjs = require('../../utilities/redis');

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
                    redisjs.clearCache(info.labelName);
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
    };

    deleteLabel = (req, res) => {
        try {
            const info = {
                userId : req.user.id,
                email: req.user.email,
                labelName : req.params.labelName,
            }
            labelservice.deleteLabel(info, (error) => {
                if (error) {
                    return res.status(400).json({
                        message: error,
                        success: false
                    });
                } else {
                    redisjs.clearCache(info.labelName);
                    return res.status(200).json({
                        message: "Label Deleted successfully",
                        success: true,
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

    getLabels = (req,res) => {
        try {
            const info = {
                userId : req.user.id
            }
            labelservice.getLabels(info,(error,data) => {
                if (data.length === 0) {
                    return res.status(207).json({
                        message: 'User has not created any Labels yet',
                        success: true
                    });
                } else if (data.length !== 0) {
                    return res.status(200).json({
                        success: true,
                        message: "user Labels",
                        data
                    })
                }
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                success: false
            })
        }
    };

    getLabelbyName = async (req,res) => {
        try {
            const info = {
                userId: req.user.id,
                labelName: req.params.labelName
            }
            const cachevalue = await redisjs.redisLabelbyName(info.labelName);
            if (cachevalue) {
                const data = JSON.parse(cachevalue);
                return res.status(200).json({
                    message: "Label details",
                    success: true,
                    data : {
                        labelName: data.labelName,
                        noteId: data.noteId
                    }
                })
            }
            labelservice.getLabelbyName(info, (error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: error,
                        success: false
                    });
                } else {
                    redisjs.setData(info.labelName,JSON.stringify(data));
                    return res.status(201).json({
                        message: "Label details",
                        success: true,
                        data : {
                            labelName: data.labelName,
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
    }
}

module.exports = new Controller();
