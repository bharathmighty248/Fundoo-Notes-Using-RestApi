const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../server');
const data = require('./user.data.json');

chai.should();

chai.use(chaiHttp);

describe("User Registration Api", () => {
    it("whenGivenDetails_CorrectUserShuold_RegisterSuccessfully", (done) => {
        const registerUser = {
            firstName: faker.name.findName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: "bharath@248"
        };
        chai
        .request(server)
        .post("/register")
        .send(registerUser)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("User Registered");
            res.body.should.have.property("success").eql(true);
            done();
        });
    });

    it("whenGivenDetails_HaveDuplicateUser_ShouldReturnUserExist", (done) => {
        chai
        .request(server)
        .post("/register")
        .send(data.registration.user)
        .end((err, res) => {
            res.should.have.status(409);
            res.body.should.have.property("message").eql("User already exist");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGivenDetail_WithoutEmail_ShouldReturn_Wrong Input", (done) => {
        chai
        .request(server)
        .post("/register")
        .send(data.registration.withoutEmail)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("Wrong Input");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGivenDetail_WithoutFirstName_ShouldReturn_Wrong Input", (done) => {
        chai
        .request(server)
        .post("/register")
        .send(data.registration.withoutFirstname)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("Wrong Input");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("whenGivenDetail_WithoutLastName_ShouldReturn_Wrong Input", (done) => {
        chai
        .request(server)
        .post("/register")
        .send(data.registration.withoutLastname)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("Wrong Input");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("WhenGivenEmail_DoesNotMatch_withRegex_ShouldReturn_Wrong Input", (done) => {
        chai
        .request(server)
        .post("/register")
        .send(data.registration.WrongEmail)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("Wrong Input");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("WhenGivenFirstName_DoesNotMatch_withRegex_ShouldReturn_Wrong input", (done) => {
        chai
        .request(server)
        .post("/register")
        .send(data.registration.WrongFirstname)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("Wrong Input");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("WhenGivenLastName_DoesNotMatch_withRegex_ShouldReturn_Wrong input", (done) => {
        chai
        .request(server)
        .post("/register")
        .send(data.registration.WrongLastname)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("Wrong Input");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("WhenGivenPassword_DoesNotMatch_withRegex_ShouldReturn_Wrong input", (done) => {
        chai
        .request(server)
        .post("/register")
        .send(data.registration.WrongPassword)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("Wrong Input");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });
});
