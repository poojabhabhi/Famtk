module.exports.config = {
  name: "bot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "BotolBaba",
  usePrefix: true,
  description: "Simple Banglish Ai Chatbot",
  commandCategory: "Ai Robot",
  usages: "/Famtik [typeinBanglish]",
  cooldowns: 0,
  dependencies: {"axios" : ""}
};
module.exports.run = async({api, event, args}) => {
	
	const axios = require('axios');
	
if (args.join() == "") { 
	  return api.sendMessage(`হ্যা বলো আমি শুনতেছি.`, event.threadID, event.messageID)}
	
	else {
		let uint = encodeURI(args.join(' '));
	const res = await axios.post('https://api.simsimi.vn/v2/simtalk',
    new URLSearchParams({
    'text': `${uint}`,
    'lc': 'bn'
    })
    );
   var d1 = res.data.message
	return api.sendMessage(`${d1}`, event.threadID, event.messageID)
	
	}
		
	
	
}