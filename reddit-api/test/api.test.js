const chai = require("chai");
// cons expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

describe("Reddit API", function () {
  it("should fetch and store Reddit posts", function (done) {
    chai
      .request(server)
      .get("/api/fetch-reddit-posts")
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("success", true);
        res.body.should.have.property(
          "message",
          "Reddit posts fetched and stored successfully.",
        );
        res.body.should.have.property("redditPosts");
        done();
      });
  });

  it("should handle errors when fetching and storing Reddit posts", function (done) {
    chai
      .request(server)
      .get("/api/fetch-reddit-posts")
      .end(function (err, res) {
        res.should.have.status(500);
        res.body.should.be.an("object");
        res.body.should.have.property("success", false);
        res.body.should.have.property(
          "message",
          "Error while fetching Reddit posts.",
        );
        done();
      });
  });
});
