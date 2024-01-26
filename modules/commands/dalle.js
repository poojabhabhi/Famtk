const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "dalle",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Atik Hasan",
  usePrefix: true,
  description: "Bing AI Image Generator.",
  commandCategory: "image",
  cooldowns: 5
};

module.exports.run = async function ({ args, event, api }) {
  try {
    const p = args.join(" ");

    const w = await api.sendMessage("Please wait...", event.threadID);
    const data2 = {
      prompt: p,
      cookie: "1n3ntCydWTmiodO0FJRJMSSe7xM51p2CAmZ-6Kf5sF4M9mI0DuSTXr24ZL5-wKXpqxHDRqdg-n3B12NrHN0JPEq5wWFS-AHKOuX6BCykNfRHkUwTa8zU23zWA7uchb9Br5S_Di9hjp7JCpq8wJkCtcRtIeJEXzovlORlL6x60BTiSjaNIH8BOvDMj7L5FRPgKfYmiirNZtonzXUDOzCtOCA"
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('https://project-dallee3.onrender.com/dalle', data2, config);

    if (response.status === 200) {
      const imageUrls = response.data.image_urls.filter(url => !url.endsWith('.svg'));
      const imgData = [];

      for (let i = 0; i < imageUrls.length; i++) {
        const imgResponse = await axios.get(imageUrls[i], { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

  await api.unsendMessage(w.messageID);

    await api.sendMessage({
      body: `✅ | Generated`,
      attachment: imgData
    }, event.threadID); 

  }
 } catch (error) {
    console.error(error);
    api.sendMessage('Oops! An error occurred.', event.threadID);
  }
};
