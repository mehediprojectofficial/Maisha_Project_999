const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "sexy",
    version: "3.0",
    role: 2,
    author: "MEHEDI HASAN MIRAZ × Modified",
    description: "18+ Random Hot Video",
    category: "18+",
    usages: "Akash",
    cooldowns: 5
  },

  onStart: async function ({ event, api }) {
    const videos = [
      "https://files.catbox.moe/51zmkl.mp4"
    ];

    const randomLink = videos[Math.floor(Math.random() * videos.length)];
    const path = __dirname + "/cache/sexy.mp4";

    try {
      const response = await axios({
        url: randomLink,
        method: "GET",
        responseType: "stream"
      });

      const writer = fs.createWriteStream(path);
      response.data.pipe(writer);

      writer.on("finish", () => {
        api.sendMessage(
          {
            body: "💫__𝗧𝘂𝗺𝗶 𝗮𝗺𝗮𝗸𝗲 𝘁𝘂𝗺𝗮𝗿 𝗯𝗲𝗸𝘁𝗶𝗴𝗼𝘁𝗼 𝗳𝘂𝗹𝗹 𝗯𝗮𝗻𝗮𝘂",
            attachment: fs.createReadStream(path)
          },
          event.threadID,
          () => fs.unlinkSync(path),
          event.messageID
        );
      });

      writer.on("error", (err) => {
        api.sendMessage("🍂😔 প্লিজ ভিডিও টা দাও গো__🍂🍓", event.threadID);
        console.error(err);
      });

    } catch (error) {
      api.sendMessage("Error হয়েছে, আবার চেষ্টা কর ভাই!", event.threadID);
      console.error(error);
    }
  }
};
