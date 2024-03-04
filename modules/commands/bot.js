module.exports.config = {
  name: "BotolBaba",
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
module.exports.handleEvent = async({api, event, args}) => {
	
	const axios = require('axios');
	
if (event.body !== null) {
		let uint = encodeURI(event.body);
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