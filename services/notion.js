const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

module.exports = async function getVideos() {
  const payload = {
    path: `databases/${process.env.NOTION_DATABASE_ID}/query`,
    method: "POST",
  };

  //   payload returns an object with a results arr, which we then destructure
  const { results } = await notion.request(payload);

  //   for the results, we can get the title, description, etc.
  const videos = results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      date: page.properties.Date.date.start,
      tags: page.properties.Tags.rich_text[0].text.content,
      description: page.properties.Description.rich_text[0].text.content,
    };
  });

  return videos;
};
