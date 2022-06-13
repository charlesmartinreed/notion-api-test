const getVideos = require("./services/notion");
const express = require("express");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static("public"));

// ROUTES
app.get("/videos", async (req, res) => {
  const videos = await getVideos();
  res.status(200).json(videos);
});

app.listen(PORT);
