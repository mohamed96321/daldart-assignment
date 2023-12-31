const app = require("./api/app");
const config = require("./config/env");
const http = require("http");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection: ${err.message} | ${err.name}`);
  server.close(() => {
    console.log("Shutting down server");
    process.exit(1);
  });
});
