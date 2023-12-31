if (process.env.NODE_ENV !== "production") {
  // require("dotenv").config();
  module.exports = require("./env.dev");
} else {
  module.exports = require("./env.prod");
}
