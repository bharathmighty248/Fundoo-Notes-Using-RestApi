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
