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
            res.body.should.have.property("message").eql("User Registered, Please verify your Email to continue..");
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

describe("User Login Api", () => {
    it("WhenGivenEmail_DoesNotMatch_withRegex_ShouldReturn_Wrong input", (done) => {
        chai
        .request(server)
        .post("/login")
        .send(data.login.InvalidEmail)
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
        .post("/login")
        .send(data.login.invalidPassword)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("Wrong Input");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("WhenGivenIncorrectEmail_ShouldReturn_Unable to login", (done) => {
        chai
        .request(server)
        .post("/login")
        .send(data.login.incorrectEmail)
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Unable to login. Please verify your Email first or Please enter correct info");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("WhenGivenIncorrectPassword_ShouldReturn_Unable to login", (done) => {
        chai
        .request(server)
        .post("/login")
        .send(data.login.incorrectPassword)
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Unable to login. Please verify your Email first or Please enter correct info");
            res.body.should.have.property("success").eql(false);
            done();
        });
    });

    it("WhenGivencorrectUserDetails_ShouldReturn_loggedinSuccessfully", (done) => {
        chai
        .request(server)
        .post("/login")
        .send(data.login.user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("User logged in successfully");
            res.body.should.have.property("success").eql(true);
            done();
        });
    });
});

describe("Forgot Password Api", () => {
    it("WhenGiven_NonregisteredUserEmail_ShouldReturn_UserDoesn'tExist", (done) => {
        chai
        .request(server)
        .post('/forgotpassword')
        .send(data.forgotPassword.nonRegisteredUser)
        .end((err,res) => {
            res.should.have.status(404);
            res.body.should.have.property("message").eql("User doesn't exist");
            res.body.should.have.property("success").eql(false);
            done();
        })
    });

    it("WhenGiven_registeredUserEmail_ShouldReturn_EmailSentSuccessfull", (done) => {
        chai
        .request(server)
        .post('/forgotpassword')
        .send(data.forgotPassword.registereduser)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("Reset code sent to your registered email..");
            res.body.should.have.property("success").eql(true);
            done();
        })
    })
});

describe("Reset Password Api", () => {
    it("WhenGiven_InvalidInfo_ShouldReturn_WrongInput", (done) => {
        chai
        .request(server)
        .post('/resetpassword')
        .send(data.resetPassword.invalidInfo)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.have.property("message").eql("Wrong Input");
            res.body.should.have.property("success").eql(false);
            done();
        })
    });

    it("WhenGiven_IncorrectEmail_ShouldReturn_UnableToResetPassword", (done) => {
        chai
        .request(server)
        .post('/resetpassword')
        .send(data.resetPassword.incorrectEmail)
        .end((err,res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Unable to reset password. Please enter correct info");
            res.body.should.have.property("success").eql(false);
            done();
        })
    });

    it("WhenGiven_IncorrectResetcode_ShouldReturn_UnableToResetPassword", (done) => {
        chai
        .request(server)
        .post('/resetpassword')
        .send(data.resetPassword.incorrectResetcode)
        .end((err,res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Unable to reset password. Please enter correct info");
            res.body.should.have.property("success").eql(false);
            done();
        })
    });

    it("WhenGiven_CorrectInfo_ShouldReturn_ResetPasswordSuccessfull", (done) => {
        chai
        .request(server)
        .post('/resetpassword')
        .send(data.resetPassword.correctInfo)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("password reset successfull");
            res.body.should.have.property("success").eql(true);
            done();
        })
    });
});
