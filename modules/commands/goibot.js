module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermission: 0,
  credits: "manhIT",
  description: "Noprefix",
  commandCategory: "noPrefix",
  usages: "[]",
  cooldowns: 5,
  usePrefix: false
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  var { threadID, messageID } = event;

  var tl = [ 
    "She is mine😾",
    "She is my crush.",
    "I love her😘.",
    "She is so cute🤗",
    "In my heart♥.",
    "She is offline",
    "I'm his bf, Say to me?",
    "wanna fight?",
    "Crush😍",
    "She is mine😾." 
  ];

  var rand = tl[Math.floor(Math.random() * tl.length)];
  let yan = event.body ? event.body.toLowerCase() : '';

  if (!(yan.indexOf("umme") === 0 ||
    yan.indexOf("purni") === 0 ||
    yan.indexOf("khatun") === 0 ||
    yan.indexOf("খাতুন") === 0 ||
    yan.indexOf("johura") === 0 ||
    yan.indexOf("@johura") === 0 ||
    yan.indexOf("@khatun") === 0 ||
    yan.indexOf("@খাতুন") === 0  ||
    yan.indexOf("@purni") === 0  ||
    yan.indexOf("@umme johura khatun") === 0  ||
    yan.indexOf("crush") === 0)
     ) 
    return; {
    api.setMessageReaction("💗", event.messageID, (err) => {}, true);
    api.sendTypingIndicator(event.threadID, true);

    let userH = event.senderID;
    const userInfo = global.data.userName.get(userH) || await Users.getUserInfo(userH);
    if (event.senderID == api.getCurrentUserID()) return;

    var msg = {
      body: "@" + userInfo + ", " + rand, 
      mentions: [{
        tag: "@" + userInfo,
        id: userH
      }]
    };

    setTimeout(function() {
      return api.sendMessage(msg, threadID, messageID);
    }, 2000);
  }

  if (
    yan.includes("haha") ||
    yan.includes("lmao") ||
    yan.includes("lol") ||
    yan.includes("yahoo") ||
    yan.includes("yahuu") ||
    yan.includes("agoy") ||
    yan.includes("aguy") ||
    yan.includes("😄") ||
    yan.includes("🤣") ||
    yan.includes("😆") ||
    yan.includes("😄") ||
    yan.includes("😅") ||
    yan.includes("xd")
  ) {
    return api.setMessageReaction("😆", event.messageID, (err) => {}, true);
  } 

  if (
    yan.includes("kawawa") ||
    yan.includes("sad") ||
    yan.includes("agoi") ||
    yan.includes("sakit") ||
    yan.includes("skit") ||
    yan.includes("pain") ||
    yan.includes("pighati")
  ) {
    return api.setMessageReaction("🥲", event.messageID, (err) => {}, true);
  }
};

module.exports.run = async function ({ api, event, __GLOBAL }) {};
