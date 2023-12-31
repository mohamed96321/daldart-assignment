const axios = require("axios");
const admin = require("firebase-admin");
const asyncHandler = require("express-async-handler");
const config = require("../../config/env");

const serviceAccount = require("../keys/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.DATABASE_URL,
});

exports.getPosts = asyncHandler(async (req, res) => {
  try {
    const redditURL = "https://www.reddit.com/r/FlutterDev/";
    const response = await axios.get(`${redditURL}.json`);
    const posts = response.data.data.children.map((child) => child.data);

    const db = admin.database();
    const ref = db.ref("redditPosts");
    await ref.set(posts);

    res.json({
      success: true,
      message: "Reddit posts fetched and stored successfully.",
      redditPosts: posts,
    });
  } catch (error) {
    console.error("Error fetching and storing Reddit posts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch and store Reddit posts.",
    });
  }
});
