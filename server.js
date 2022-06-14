const express = require("express");
const { Client } = require("@notionhq/client");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const HOST = "localhost";

const app = express();
app.use(cors());
app.use(express.json());

const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

// POST REQUEST CONTAINING NAME, PHONE, NOTES
// CONSTRUCT DATABASE ENTRY TO NOTION
app.post("/submitFormToNotion", async (req, res) => {
  const { name, phoneNumber, notes } = req.body;

  try {
    const response = await notionClient.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        // Name = entire page
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        "Phone Number": {
          rich_text: [
            {
              text: {
                content: phoneNumber,
              },
            },
          ],
        },
        Notes: {
          rich_text: [
            {
              text: {
                content: notes,
              },
            },
          ],
        },
      },
    });
    console.log(`Response was successful`, res);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, HOST, () =>
  console.log(`Server up and running on ${HOST}:${PORT}`)
);
