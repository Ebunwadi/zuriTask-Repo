import * as dotenv from "dotenv";
import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import server from "../index.js";
import { getUserFromDatabase } from "../utils/dbService.js";

dotenv.config();

// ASSERTION STYLE
chai.should();

chai.use(chaiHttp);
describe("user test", async () => {
  const user = await getUserFromDatabase();
  const id = user[0]._id;
  const token = jwt.sign({ id: id }, process.env.JWT_TOKEN_SECRET);
  // test getProfile route
  it("should throw an error without a token", (done) => {
    chai
      .request(server)
      .get(`/user/profile/${id}`)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property("success").eq(false);
        done();
      });
  });

  it("should get profile successfully", (done) => {
    console.log("id", id);
    chai
      .request(server)
      .get(`/user/profile/${id}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("success").eq(true);
        done();
      });
  });

  // test post comment route
  it("should throw an error if req.body is empty", (done) => {
    chai
      .request(server)
      .post("/user/comment")
      .set("authorization", `Bearer ${token}`)
      .send({ comment: "" })
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property("success").eq(false);
        done();
      });
  });

  it("should suucessfuly post comment", (done) => {
    chai
      .request(server)
      .post("/user/comment")
      .set("authorization", `Bearer ${token}`)
      .send({ comment: "comment" })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("success").eq(true);
        done();
      });
  });
});
