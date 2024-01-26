module.exports.config = {
  name: "goibotv2",
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
    "He is busy with his crush.",
    "Maybe offline.",
    "His crush is beautiful.",
    "He is sleeping.",
    "Offline.",
    "He is busy with his crush, don't disturb him.",
    "inbox him.",
    "He is in love with his crush..",
    "Sleeping...",
    "Typing............." 
  ];

  var rand = tl[Math.floor(Math.random() * tl.length)];
  let yan = event.body ? event.body.toLowerCase() : '';

  if (yan.indexOf("atik") === 0) 
    {
    api.setMessageReaction("🔍", event.messageID, (err) => {}, true);
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
};

module.exports.run = async function ({ api, event, __GLOBAL }) {};
