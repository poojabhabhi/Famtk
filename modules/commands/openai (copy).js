const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
  name: "banai",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "Yan Maglinte",
  description: "Can assist you in completing your homework, speech, and even essays.",
  commandCategory: "chatbots",
  usePrefix: true,
  usages: "ask anything",
  cooldowns: 5,
  dependencies: {}
};

async function getUserName(api, senderID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID].name;
  } catch (error) {
    console.log(error);
    return "User";
  }
}

module.exports.run = async function ({ api, event, args, Users, Threads }) {
  api.setMessageReaction("⏳", event.messageID, (err) => {}, true);

  const apiKey = "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";
  const url = "https://api.openai.com/v1/chat/completions";
  const senderID = event.senderID;

  // Get the user's name
  const userName = await getUserName(api, senderID);
  const currentTime = moment().tz("Asia/Dhaka").format("MMM D, YYYY - hh:mm A");

  const promptMessage = `System: Act as a Messenger Chatbot. As a Chatbot you will be responsible`;
  const blank = args.join(" ");
  const data = `User: ${args.join(" ") + ' , reply in bangla'}\nYou: `;

  if (blank.length < 2) {
    if (args.includes("time") || args.includes("oras") || args.includes("panahon")) {
      api.sendMessage(`The current time is ${currentTime}.`, event.threadID, event.messageID);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    } else if (args.includes("image") || args.includes("larawan")) {
      const imageUrl = "https://example.com/image.jpg";
      api.sendMessage({
        body: "",
        attachment: axios.get(imageUrl, { responseType: "arraybuffer" }),
      }, event.threadID, (err, messageInfo) => {
        if (err) console.error(err);
        api.setMessageReaction("✅", messageInfo.messageID, (err) => {}, true);
      });
    } else {
      api.sendMessage("𝖧𝖾𝗅𝗅𝗈👋, 𝖧𝗈𝗐 𝖼𝖺𝗇 𝗂 𝖺𝗌𝗌𝗂𝗌𝗍 𝗒𝗈𝗎 𝗍𝗈𝖽𝖺𝗒?", event.threadID, event.messageID);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    }
  } else {
    api.sendMessage('🗨️ |𝙱𝚊𝚗𝙰𝙸 𝚒𝚜 𝚝𝚑𝚒𝚗𝚔𝚒𝚗𝚐...', event.threadID, event.messageID);
    try {
      const response = await axios.post(
        url,
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: promptMessage },
            { role: "user", content: data },
          ],
          temperature: 0.7,
          top_p: 0.9,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const message = response.data.choices[0].message.content;
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
        api.sendMessage(error.message, event.threadID);
      }
    }
  }
};