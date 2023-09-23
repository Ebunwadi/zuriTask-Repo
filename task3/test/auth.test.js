import * as dotenv from "dotenv";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";
import { getUserFromDatabase, writeToDatabase } from "../utils/dbService.js";

dotenv.config();

// ASSERTION STYLE
chai.should();

chai.use(chaiHttp);

const body = {
  username: "user",
  password: "user",
};

describe("auth test", () => {
  // test register users
  it("should successfully register a user", (done) => {
    chai
      .request(server)
      .post("/auth/register")
      .send(body)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.have.property("success").eq(true);
        done();
      });
  });

  it("username must be unique", (done) => {
    chai
      .request(server)
      .post("/auth/register")
      .send(body)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property("success").eq(false);
        done();
      });
  });

  it("all fields must not be empty", (done) => {
    chai
      .request(server)
      .post("/auth/register")
      .send({})
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property("success").eq(false);
        done();
      });
  });

  // test login
  it("It should login a user with a valid username and password", (done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send(body)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("success").eq(true);
        done();
      });
  });

  it("It should not login a user with an invalid username and password", (done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({
        username: "userss",
        password: "user",
      })
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have
          .property("message")
          .eq("username or password is incorrect");
        done();
      });
  });

  // delete user from database after the test
  after(async () => {
    const user = await getUserFromDatabase();
    const foundUser = await user.filter(
      (user) => user.username !== body.username,
    );
    await writeToDatabase(foundUser);
  });
});
