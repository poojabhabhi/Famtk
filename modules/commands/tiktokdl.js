module.exports.config = {
  name: "tikdl",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Atik Hasan",
  description: "Download TikTok videos",
  commandCategory: "tikvideo",
  usage: `${global.config.PREFIX}tikdl <link>`,
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
  api.sendMessage("Usage: /tikdl <link>", event.threadID);
  return;
  }
  api.sendMessage(`Downloading...`, event.threadID);
  const data2 = {
    headers: {
    'X-RapidAPI-Key': '59b9e9930amsh57f7e1367edb3c9p1c21a9jsn42c609f99290'}
  };
  const response = await axios.get(`https://tiktok-download-without-watermark.p.rapidapi.com/analysis?url=${encodeURIComponent(link)}`, data2);

  const videoUrl = response.data.data.play;
  const title = response.data.data.title;

  if (!videoUrl) {
  api.sendMessage("No video found for the given link.", event.threadID);
  return;
  }

  const videoResponse = await axios({
  method: "get",
  url: videoUrl,
  responseType: "stream",
  });

  const filePath = path.join(__dirname, "cache", "tiktok_video.mp4");
  videoResponse.data.pipe(fs.createWriteStream(filePath));

  videoResponse.data.on("end", () => {
  api.sendMessage(
    {
    attachment: fs.createReadStream(filePath),
    body: `${title}`,
    },
    event.threadID,
    () => fs.unlinkSync(filePath)
  );
  });
  } catch (error) {
  console.error("Error:", error);
  api.sendMessage("An error occurred while processing the request.", event.threadID);
  }
};