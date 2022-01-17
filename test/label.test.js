const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const data = require('./label.data.json');
const labelmodel = require('../app/models/labels.model').labelmodel;

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

describe("update Label Api", () => {
    it("whenGiven_invalidToken_ShouldReturn_Authorisation failed,Invalid user", (done) => {
        const token = data.token.invalidToken;
        const label = {
            labelName : "first Label",
            noteId : "61d2b661b083bb692793ced4",
            newLabelName: "updated first Label "
        };
        chai
        .request(server)
        .put("/updatelabel")
        .set({ authorization: token })
        .send(label)
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Authorisation failed, Invalid user");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGiven_ValidToken_WithWrongLabelName_ShouldReturn_LabelDoesntExist", (done) => {
        const token = data.token.validToken;
        const label = {
            labelName : "third Label",
            newLabelName: "updated third Label"
        };
        chai
        .request(server)
        .put("/updatelabel")
        .set({ authorization: token })
        .send(label)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("Label doesn't Exist");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGiven_ValidToken_WithnewLabelName_ShouldReturn_LabelUpdatedSuccessfully", (done) => {
        const token = data.token.validToken;
        const label = {
            labelName : "first Label",
            newLabelName: "updated first Label"
        };
        chai
        .request(server)
        .put("/updatelabel")
        .set({ authorization: token })
        .send(label)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("Label Updated successfully");
            res.body.should.have.property("success").eql(true);
            done();
        });
    });

    it("whenGiven_ValidToken_WithNoteId_ShouldReturn_LabelUpdatedSuccessfully", (done) => {
        const token = data.token.validToken;
        const label = {
            labelName : "updated first Label",
            noteId : "61d2b661b083bb692793ced4"
        };
        chai
        .request(server)
        .put("/updatelabel")
        .set({ authorization: token })
        .send(label)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("Label Updated successfully");
            res.body.should.have.property("success").eql(true);
            done();
        });
    });
});

describe("Delete Label Api", () => {
    it("whenGiven_invalidToken_ShouldReturn_Authorisation failed,Invalid user", (done) => {
        const token = data.token.invalidToken;
        chai
        .request(server)
        .delete("/deletelabel/updated first Label")
        .set({ authorization: token })
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Authorisation failed, Invalid user");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGiven_validToken_ButWrongLabelName_ShouldReturn_LabelDoesntExist", (done) => {
        const token = data.token.validToken;
        chai
        .request(server)
        .delete("/deletelabel/first Label")
        .set({ authorization: token })
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("This Label doesn't exist");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGiven_validToken_ShouldReturn_Labeldeleted", (done) => {
        const token = data.token.validToken;
        const label = new labelmodel({
            userId : "61caf855863813291db47d70",
            email: "bharathmighty248@gmail.com",
            labelName : "first Label",
            noteId : "61d2b661b083bb692793ced5"
        });
        label.save();
        chai
        .request(server)
        .delete(`/deletelabel/first Label`)
        .set({ authorization: token })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("Label Deleted successfully");
            res.body.should.have.property("success").eql(true);
            done();
        });
    });
});
