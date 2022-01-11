const noteservice = require('../service/notes.service');
const redisjs = require('../../utilities/redis');
const logger = require('../../config/logger');

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
                    logger.error("error while creating note");
                    return res.status(400).json({
                        message: 'error while creating note',
                        success: false
                    });
                } else {
                    logger.info("Note created successfully");
                    return res.status(200).json({
                        message: "Note created successfully",
                        success: true,
                        data : {
                            email: data.email,
                            title: data.title,
                            description: data.description
                        }
                    })
                }
            })
        } catch (error) {
            logger.error("Internal server error");
            return res.status(500).json({
                message: 'Internal server error',
                success: false
            })
        }
    };

    updatenotes = (req,res) => {
        try {
            const info = {
                email: req.user.email,
                noteId: req.params.noteId,
                title: req.body.title,
                description: req.body.description
            }
            noteservice.updatenotes(info,(error,data) => {
                if (error) {
                    logger.error("This note is not exist or this belongs to another user");
                    return res.status(400).json({
                        message: 'This note is not exist or this belongs to another user',
                        success: false
                    });
                } else {
                    redisjs.clearCache(info.noteId);
                    logger.info("Note updated successfully");
                    return res.status(200).json({
                        message: "Note updated successfully",
                        success: true,
                        data : {
                            email: data.email,
                            title: data.title,
                            description: data.description
                        }
                    })
                }
            });
        } catch (error) {
            logger.error("Internal server error");
            return res.status(500).json({
                message: 'Internal server error',
                success: false
            });
        }
    };

    deletenotes = (req,res) => {
        try {
            const info = {
                email: req.user.email,
                noteId: req.params.noteId
            }
            noteservice.deletenotes(info,(error) => {
                if (error) {
                    logger.error("This note is not exist or this belongs to another user");
                    return res.status(400).json({
                        message: 'This note is not exist or this belongs to another user',
                        success: false
                    });
                } else {
                    redisjs.clearCache(info.noteId);
                    logger.info("Note deleted successfully");
                    return res.status(200).json({
                        message: "Note deleted successfully",
                        success: true
                    })
                }
            });
        } catch (error) {
            logger.error("Internal server error");
            return res.status(500).json({
                message: 'Internal server error',
                success: false
            });
        }
    };

    getnotes = (req,res) => {
        try {
            const info = {
                email: req.user.email
            }
            noteservice.getnotes(info,(error,data) => {
                if (data.length === 0) {
                    logger.error("User has not created any notes yet");
                    return res.status(207).json({
                        message: 'User has not created any notes yet',
                        success: true
                    });
                } else if (data.length !== 0) {
                    return res.status(200).json({
                        message: "user notes",
                        success: true,
                        data
                    })
                }
            });
        } catch (error) {
            logger.error("Internal server error");
            return res.status(500).json({
                message: 'Internal server error',
                success: false
            });
        }
    };

    getnotebyId = async (req,res) => {
        try {
            const info = {
                email: req.user.email,
                noteId: req.params.noteId
            }
            const cachevalue = await redisjs.redisNotebyId(info.noteId);
            if (cachevalue) {
                const data = JSON.parse(cachevalue);
                return res.status(200).json({
                    message: "This Note is..",
                    success: true,
                    data
                })
            }
            noteservice.getnotebyId(info,(error,data) => {
                if (error) {
                    logger.error("This note is not exist or this belongs to another user");
                    return res.status(400).json({
                        message: 'This note is not exist or this belongs to another user',
                        success: false
                    });
                } else {
                    redisjs.setData(info.noteId,JSON.stringify(data));
                    return res.status(201).json({
                        message: "This Note is..",
                        success: true,
                        data
                    })
                }
            });
        } catch (error) {
            logger.error("Internal server error");
            return res.status(500).json({
                message: 'Internal server error',
                success: false
            });
        }
    };
}

module.exports = new Controller();

