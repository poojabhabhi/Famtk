module.exports.config = {
  name: "tiktok",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Atik Hasan",
  description: "tiktok videos download",
  commandCategory: "Utilities",
  usage: `${global.config.PREFIX}tiktok <link>`,
  usePrefix: true,
  cooldowns: 5,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");


module.exports.run = async function({ api, event, args }) {
  try {
  const link = args[0];
  if (!link) {
  api.sendMessage("Usage: /tiktok <link>", event.threadID, event.messageID);
  return;
  }
  api.sendMessage(`Downloading...`, event.threadID , event.messageID);

  const response = await axios.get(`https://api-samir.onrender.com/tiktok?url=${encodeURIComponent(link)}`);

  const videoUrl = response.data.url;
  
  if (!videoUrl) {
  api.sendMessage("No video found for the given link.", event.threadID);
  return;
  }

  const videoResponse = await axios({
  method: "get",
  url: videoUrl,
  responseType: "stream",
  });

  const filePath = path.join(__dirname, "cache", "tikvideo.mp4");
  videoResponse.data.pipe(fs.createWriteStream(filePath));

  videoResponse.data.on("end", () => {
  api.sendMessage(
    {
    attachment: fs.createReadStream(filePath),
    body: `Downloaded Successfully.`,
    },
    event.threadID ,event.messageID,
    () => fs.unlinkSync(filePath)
  );
  });
  } catch (error) {
  console.error("Error:", error);
  api.sendMessage("An error occurred while processing the request.", event.threadID, event.messageID);
  }
};
