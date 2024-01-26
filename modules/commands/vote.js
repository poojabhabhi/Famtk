const axios = require('axios');

module.exports.config = {
  name: "vote",
  version: "1.2.0",
  hasPermission: 0,
  credits: "Atik Hasan",
  cooldowns: 5,
  commandCategory: "Nid",
  usePrefix: true,
};

module.exports.run = async function({ api, event, args }) {
  try {
    const messageID = event.messageID;
    const threadID = event.threadID;
    const content = args.slice(1).join(" ").split("|").map((item) => item.trim());
    if (args[0] === 'teach') {
       const db = content[1];
    const search = content[0];
        
        const res = await axios.post('http://apps.ecs.gov.bd/api/v1/real-verify-nid/', new URLSearchParams({'searchValue': `${search}`,  'dob':`${db}`}));
      
       const serial = res.data.voting_serial;
        return api.sendMessage(`${serial}`, threadID, messageID);
      
      } catch (error) {
        console.error(error);
        api.sendMessage("Try again later dear.", threadID, messageID); } 
}
          