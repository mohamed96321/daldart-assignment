const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../api/app");

chai.use(chaiHttp);

describe("Reddit API", () => {
  /*
   * Test the /GET route
   */
  describe("/GET posts", () => {
    it("should fetch and store Reddit posts", (done) => {
      chai
        .request(app)
        .get("/api/fetch-reddit-posts")
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("success", true);
          expect(res.body).to.have.property(
            "message",
            "Reddit posts fetched and stored successfully.",
          );
          expect(res.body).to.have.property("redditPosts");
          expect(res.body.redditPosts).to.be.an("array");
        });
      done();
    });

    it("should handle errors when fetching Reddit posts", (done) => {
      chai
        .request(app)
        .get("/api/fetch-reddit-posts")
        .end(function (err, res) {
          expect(res).to.have.status(500);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("success", false);
          expect(res.body).to.have.property(
            "message",
            "Failed to fetch and store Reddit posts.",
          );
        });
      done();
    });
  });
});
