const getVideos = require("./services/notion");

(async () => {
  const myVideos = await getVideos();
  console.log(myVideos);
})();
