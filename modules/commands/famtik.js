const axios = require('axios');

module.exports.config = {
  name: "famtik",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "JARiF",
  cooldowns: 5,
  commandCategory: "Ai Robot",
  usePrefix: true,
};

module.exports.run = async function({ api, event, args }) {
  try {
    const subCommand = args[0];
    const messageID = event.messageID;
    const threadID = event.threadID;

    if (subCommand === 'teach') {
      const content = args.slice(1).join(" ").split(" ").map((item) => item.trim());
      const question = content[0];
      const answer = content[1];

      if (!question || !answer) {
        return api.sendMessage("Please provide both the question and the answer separated by '|'.\nExample: /famtik teach Name | My name is Famtik ", threadID, messageID);
      }

      try {
        const teachUrl = `https://simsimi.vyturex.com/teach?ques=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}`;
        const teachResponse = await axios.get(teachUrl);
        api.sendMessage(teachResponse.data, threadID, messageID);
      } catch (error) {
        console.error(error);
        api.sendMessage("Try again later dear.", threadID, messageID);
      }
    } else if (subCommand === 'delete') {
      try {
        const questionToDelete = args.slice(1).join(' ');
        if (!questionToDelete) {
          api.sendMessage('Please provide the question you want to delete.', threadID, messageID);
          return;
        }

        const deleteUrl = `https://simsimi.vyturex.com/delete?ques=${encodeURIComponent(questionToDelete)}`;
        const deleteResponse = await axios.get(deleteUrl);

        api.sendMessage(deleteResponse.data, threadID, messageID);

      } catch (error) {
        console.error(error);
        api.sendMessage(error.message, threadID, messageID);
      }
    } else {
      const name = args.join(' ');

      try {
        const response = await axios.get(`https://simsimi.vyturex.com/chat?ques=${encodeURIComponent(name)}`);
        const responseData = response.data;
        api.sendMessage(responseData, threadID, messageID);
      } catch (error) {
        console.error(error);
        api.sendMessage('Oops! An error occurred.', threadID, messageID);
      }
  }
  } catch (error) {
    api.sendMessage('Oops! An error occurred: ' + error.message, threadID, messageID);
  }
};