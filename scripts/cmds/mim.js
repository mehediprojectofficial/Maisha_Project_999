const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "mim",
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
      "https://files.catbox.moe/3a63gk.mp4",
      "https://files.catbox.moe/tfhto7.mp4",
      "https://files.catbox.moe/djzmwt.mp4",
      "https://files.catbox.moe/ru1uhw.mp4",
      "https://files.catbox.moe/illzkh.mp4",
      "https://files.catbox.moe/o5ac7t.mp4",
      "https://files.catbox.moe/ii4cer.mp4",
      "https://files.catbox.moe/cbbvey.mp4",
      "https://files.catbox.moe/c2rns9.mp4",
      "https://files.catbox.moe/221936.mp4",
      "https://files.catbox.moe/fxip2f.mp4",
      "https://files.catbox.moe/js9r5i.mp4",
      "https://files.catbox.moe/er2lh0.mp4",
      "https://files.catbox.moe/wz76q0.mp4",
      "https://files.catbox.moe/iqhio7.mp4",
      "https://files.catbox.moe/zftum4.mp4",
      "https://files.catbox.moe/xym5ez.mp4",
      "https://files.catbox.moe/4c4hk1.mp4",
      "https://files.catbox.moe/lgusrd.mp4",
      "https://files.catbox.moe/b3nrbp.mp4",
      "https://files.catbox.moe/6m6h45.mp4",
      "https://files.catbox.moe/tcbdqc.mp4",
      "https://files.catbox.moe/irff3s.mp4",
      "https://files.catbox.moe/qpz9ci.mp4",
      "https://files.catbox.moe/ksg8v2.mp4"
    ];

    const randomLink = videos[Math.floor(Math.random() * videos.length)];
    const path = __dirname + "/cache/আকাশ.mp4";

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
