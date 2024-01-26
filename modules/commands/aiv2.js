module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Atik Hasan",
  usePrefix: true,
  description: "Simple Banglish Ai Chatbot",
  commandCategory: "Ai Robot",
  usages: "/ai [question]",
  cooldowns: 0,
  dependencies: {"axios" : ""}
};
module.exports.run = async({api, event, args}) => {
	
	const axios = require('axios');
	
if (args.join() == "") { 
	  return api.sendMessage(`𝖧𝖾𝗅𝗅𝗈👋, 𝖧𝗈𝗐 𝖼𝖺𝗇 𝗂 𝖺𝗌𝗌𝗂𝗌𝗍 𝗒𝗈𝗎 𝗍𝗈𝖽𝖺𝗒?`, event.threadID, event.messageID)}
	
	else {
		let uint = encodeURI(args.join(' '));
	const res = await axios.get(`https://bnw.samirzyx.repl.co/api/Gemini?text=${uint}`);
	var d1 = res.data.candidates[0].content.parts[0].text
	return api.sendMessage(`${d1}`, event.threadID, event.messageID)
  }
}