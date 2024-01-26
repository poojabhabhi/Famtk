module.exports.config = {
  name: "fbdl",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Atik Hasan",
  description: "Fb videos download",
  commandCategory: "Utilities",
  usage: `${global.config.PREFIX}fbdown <link>`,
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
  api.sendMessage("Usage: /fbdl <link>", event.threadID);
  return;
  }
  api.sendMessage(`Downloading...`, event.threadID);

  const response = await axios.get(`https://api.nayan-project.repl.co/nayan/fbdown?url=${encodeURIComponent(link)}`);

  const videoUrl = response.data.hd;
  const time = response.data.time;
  if (!videoUrl) {
  api.sendMessage("No video found for the given link.", event.threadID);
  return;
  }

  const videoResponse = await axios({
  method: "get",
  url: videoUrl,
  responseType: "stream",
  });

  const filePath = path.join(__dirname, "cache", "fb_video.mp4");
  videoResponse.data.pipe(fs.createWriteStream(filePath));

  videoResponse.data.on("end", () => {
  api.sendMessage(
    {
    attachment: fs.createReadStream(filePath),
    body: `Downloaded Successfully. \n Time: ${time}`,
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