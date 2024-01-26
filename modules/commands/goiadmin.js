module.exports.config = {
 name: "goiadminn",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "John Arida",
 description: "Bot will rep ng tag admin or rep ng tagbot ",
 commandCategory: "Other",
 usages: "",
 usePrefix: true,
 cooldowns: 5
};
module.exports.handleEvent = function({ api, event }) {
 if (event.senderID !== "100023996313655") {
   var aid = ["100023996313655"];
   for (const id of aid) {
   if ( Object.keys(event.mentions) == id) {
     var msg = ["Stop mentioning my creator, he's busy 😗", "My Creator is currently offline 😢","𝖠𝗇𝗈𝗍𝗁𝖾𝗋 𝗍𝖺𝗀 𝗂𝗇 𝗆𝗒 𝖺𝖽𝗆𝗂𝗇, 𝗂 𝗐𝗂𝗅𝗅 𝗉𝗎𝗇𝖼𝗁 𝗒𝗈𝗎 🙂"," Admin is busy with his crush","don't disturb him 🙄","Do you like my creator thats why your tagging him? Why dont you add him https://www.facebook.com/ARAtik169  😏"," Another tag in my Creator, i will kick you"];
     api.setMessageReaction("😍", event.messageID, (err) => {}, true);
     return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
   }
   }}
};
module.exports.run = async function({}) {
}