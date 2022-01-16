const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const data = require('./label.data.json');

chai.should();

chai.use(chaiHttp);

describe("Add Label Api", () => {
    it("whenGiven_invalidToken_ShouldReturn_Authorisation failed,Invalid user", (done) => {
        const token = data.token.invalidToken;
        const label = {
            labelName : "first Label",
            noteId : "61d2b661b083bb692793ced4"
        };
        chai
        .request(server)
        .post("/addlabel")
        .set({ authorization: token })
        .send(label)
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Authorisation failed, Invalid user");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGiven_ValidToken_ButWrongNoteId_ShouldReturn_note doesn't Exist", (done) => {
        const token = data.token.validToken;
        const label = {
            labelName : "first Label",
            noteId : "61d2b661b083bb692793ced5"
        };
        chai
        .request(server)
        .post("/addlabel")
        .set({ authorization: token })
        .send(label)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("note doesn't Exist");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGiven_ValidToken_ButInvalidNoteId_ShouldReturn_Something went wrong", (done) => {
        const token = data.token.validToken;
        const label = {
            labelName : "first Label",
            noteId : "61d2b661b083bb692793ced"
        };
        chai
        .request(server)
        .post("/addlabel")
        .set({ authorization: token })
        .send(label)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("Something went wrong");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGiven_ValidToken_WithProperInfo_ShouldReturn_AddLabelSuccessfull", (done) => {
        const token = data.token.validToken;
        const label = {
            labelName : "first Label",
            noteId : "61d2b661b083bb692793ced4"
        };
        chai
        .request(server)
        .post("/addlabel")
        .set({ authorization: token })
        .send(label)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("Label added successfully");
            res.body.should.have.property("success").eql(true);
            done();
        });
    });
});
