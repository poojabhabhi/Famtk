const axios = require('axios');

module.exports.config = {
  name: "fbtoken",
  version: "1.0.",
  hasPermssion: 0,
  usePrefix: true,
  credits: "Aiz",
  description: "Access Token Generator",
  commandCategory: "other",
  usages: "[ uid ] [password]",
  cooldowns: 2,
};
module.exports.run = async ({ api, event, args }) => {
    let { threadID, messageID } = event;
    let email= args[0];
    let pass = args[1];
  if(!email || !pass) {
api.sendMessage(`missing input!\nusage: ${global.config.PREFIX}fbtoken [ email] [ password ]`, threadID, messageID);
return;
  }
api.sendMessage("please wait...", threadID, messageID);

    try {
        const e = await axios.get(`https://facebook.access-token-generator.repl.co/api?email=${encodeURI(email)}&password=${encodeURI(pass)}`);
        const qe = e.data.success;
     
      api.sendMessage(`Result: \n${qe}`, threadID, messageID);
      
    } catch (e) {
        return api.sendMessage(`An error ${e}`, threadID, messageID);
    };
    
};