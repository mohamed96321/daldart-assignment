const express = require("express");
const ApiError = require("./utils/apiError");
const globalErrorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

const postRoutes = require("./routes/post.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================CORS FOR CROSS ORIGIN RESOURCE SHARING / CROSS SERVER COMMUNICATION===================== //
// app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    // "VALIDATE, OPTIONS, GET, POST, PUT, DELETE, UPDATE, HEAD, OPTIONS, CONNECT, PATCH, TRACE, DELETE, TRACE",
  );
  next();
});
// ====================CORS FOR CROSS ORIGIN RESOURCE SHARING / CROSS SERVER COMMUNICATION===================== //
app.use("/api/fetch-reddit-posts", postRoutes);
// ====================MIDDLEWARES FOR ANY NOT ESXITS ROUTES===================== //
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});
// ====================MIDDLEWARES FOR ANY NOT ESXITS ROUTES===================== //

// ====================GLOBAL ERROR HANDLING MIDDLEWARES FOR EXPRESS===================== //
app.use(globalErrorMiddleware);
// ====================GLOBAL ERROR HANDLING MIDDLEWARES FOR EXPRESS===================== //

module.exports = app;
