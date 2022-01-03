const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require("faker");
const server = require('../server');
const data = require('./note.data.json');

chai.should();

chai.use(chaiHttp);

describe("Create Note Api", () => {
    it("whenGiven_validToken_ShouldReturn_NoteCreated", (done) => {
        const token = data.createnote.validToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: faker.lorem.sentence()
        };
        chai
        .request(server)
        .post("/createnote")
        .set({ authorization: token })
        .send(createNotes)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("Note created successfully");
            res.body.should.have.property("success").eql(true);
            done();
        });
    });

    it("whenGiven_InvalidToken_ShouldReturn_InvalidUser", (done) => {
        const token = data.createnote.invalidToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: faker.lorem.sentence()
        };
        chai
        .request(server)
        .post("/createnote")
        .set({ authorization: token })
        .send(createNotes)
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Authorisation failed, Invalid user");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGiven_validToken_ButTitleOrDescriptionIsn'tProvided_ShouldReturn_Notecannotbeempty", (done) => {
        const token = data.createnote.validToken;
        const createNotes = {
            title: faker.lorem.word()
        };
        chai
        .request(server)
        .post("/createnote")
        .set({ authorization: token })
        .send(createNotes)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("Please fill details..! Note can not be empty");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });
});

describe("Update Note Api", () => {
    it("whenGiven_validToken_ShouldReturn_Noteupdated", (done) => {
        const token = data.createnote.validToken;
        const updateNotes = {
            noteId:"61d2b42c6eddca632474bc81",
            title: faker.lorem.word(),
            description: faker.lorem.sentence()
        };
        chai
        .request(server)
        .put("/updatenote")
        .set({ authorization: token })
        .send(updateNotes)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("Note updated successfully");
            res.body.should.have.property("success").eql(true);
            done();
        });
    });

    it("whenGiven_InvalidToken_ShouldReturn_InvalidUser", (done) => {
        const token = data.createnote.invalidToken;
        const updateNotes = {
            noteId:"61d2b42c6eddca632474bc81",
            title: faker.lorem.word(),
            description: faker.lorem.sentence()
        };
        chai
        .request(server)
        .put("/updatenote")
        .set({ authorization: token })
        .send(updateNotes)
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Authorisation failed, Invalid user");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGiven_validToken_ButWrondnoteIdIsProvided_ShouldReturn_Notedoes'tExist", (done) => {
        const token = data.createnote.validToken;
        const updateNotes = {
            noteId:"61d2b42c6eddca632474bc8",
            title: faker.lorem.word(),
            description: faker.lorem.sentence()
        };
        chai
        .request(server)
        .put("/updatenote")
        .set({ authorization: token })
        .send(updateNotes)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("This note is not exist or this belongs to another user");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });
});

describe("Delete Note Api", () => {
    it("whenGiven_validToken_ShouldReturn_Notedeleted", (done) => {
        const token = data.createnote.validToken;
        const deleteNotes = {
            noteId:"61d2ed95a4ed7165bc11aa8d"
        };
        chai
        .request(server)
        .delete("/deletenote")
        .set({ authorization: token })
        .send(deleteNotes)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("Note deleted successfully");
            res.body.should.have.property("success").eql(true);
            done();
        });
    });

    it("whenGiven_InvalidToken_ShouldReturn_InvalidUser", (done) => {
        const token = data.createnote.invalidToken;
        const deleteNotes = {
            noteId:"61d2e347f4fb8cb1518adf81"
        };
        chai
        .request(server)
        .delete("/deletenote")
        .set({ authorization: token })
        .send(deleteNotes)
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Authorisation failed, Invalid user");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGiven_validToken_ButWrondnoteIdIsProvided_ShouldReturn_Notedoes'tExist", (done) => {
        const token = data.createnote.validToken;
        const deleteNotes = {
            noteId:"61d2e347f4fb8cb1518adf8"
        };
        chai
        .request(server)
        .delete("/deletenote")
        .set({ authorization: token })
        .send(deleteNotes)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("This note is not exist or this belongs to another user");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });
});

describe("Get Note Api", () => {
    it("whenGiven_validToken_IfUserHasAnyNotes_ShouldReturn_AllNotes", (done) => {
        const token = data.createnote.validToken;
        chai
        .request(server)
        .get("/getnotes")
        .set({ authorization: token })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("user notes");
            res.body.should.have.property("success").eql(true);
            done();
        });
    });

    it("whenGiven_InvalidToken_IfUserHasAnyNotes_ShouldReturn_Unauthorised", (done) => {
        const token = data.createnote.invalidToken;
        chai
        .request(server)
        .get("/getnotes")
        .set({ authorization: token })
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Authorisation failed, Invalid user");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGiven_validToken_IfUserHasNoNotes_ShouldReturn_NoNotesExist", (done) => {
        const token = data.createnote.validbutnonotesToken;
        chai
        .request(server)
        .get("/getnotes")
        .set({ authorization: token })
        .end((err, res) => {
            res.should.have.status(207);
            res.body.should.have.property("message").eql("User has not created any notes yet");
            res.body.should.have.property("success").eql(true);
            done();
        });
    });
});

describe("Get Note by Id Api", () => {
    it("whenGiven_validToken_IfUserHasthatNotes_ShouldReturn_Notes", (done) => {
        const token = data.createnote.validToken;
        const noteid = {
            noteId:"61d2b4b842b8bc92214f14f7"
        };
        chai
        .request(server)
        .get("/getnotebyId")
        .set({ authorization: token })
        .send(noteid)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("This Note is..");
            res.body.should.have.property("success").eql(true);
            done();
        });
    });

    it("whenGiven_InvalidToken_ShouldReturn_Unauthorised", (done) => {
        const token = data.createnote.invalidToken;
        const noteid = {
            noteId:"61d2b4b842b8bc92214f14f7"
        };
        chai
        .request(server)
        .get("/getnotebyId")
        .set({ authorization: token })
        .send(noteid)
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Authorisation failed, Invalid user");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGiven_validToken_IfUserdoesn'tHaveThatNotes_ShouldReturn_Notedoesn'tExist", (done) => {
        const token = data.createnote.validToken;
        const noteid = {
            noteId:"61d2b4b842b8bc92214f14f"
        };
        chai
        .request(server)
        .get("/getnotebyId")
        .set({ authorization: token })
        .send(noteid)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("This note is not exist or this belongs to another user");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });
});
