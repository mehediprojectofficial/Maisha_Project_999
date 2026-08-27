const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "sex",
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
      "https://drive.google.com/uc?id=11-DAJbuvp78KowPBEsP-nP_ukGZPRaZW",
      "https://drive.google.com/uc?id=1189uVGqh2LCKb2LHmoPJrJ-VrGthBydZ",
      "https://drive.google.com/uc?id=11BymhX0TNEbtvSoRK8u52hfzdqjdlkqL",
      "https://drive.google.com/uc?id=11GmsStGJ0V0E8URgjwluMfAkHnxfnjox",
      "https://drive.google.com/uc?id=11M1LlRBGCSjSLDJ9sijBLkfOMW6T2EGi",
      "https://drive.google.com/uc?id=11QgjVOd2MWUn7YhJX_fJjbeqh1U5ZH5J",
      "https://drive.google.com/uc?id=11QMSvLBFAP9Iylug6svIL700Oz6JJf0r",
      "https://drive.google.com/uc?id=11Fxw7KjqJMFSAUq-8tzNvUmw5WZq9ymK",
      "https://drive.google.com/uc?id=11KrFcrBF9tUnGIX2aTlbBzBcvouZzvRe",
      "https://drive.google.com/uc?id=11NXhy4Jkdncdv1ZVeCejMfCFyXzDU0V4",
      "https://drive.google.com/uc?id=11weSOMAQScyo7aHDkVDgxnNvDSovO_ZV",
      "https://drive.google.com/uc?id=11xjsJnQYr5grlHMboxSLR0BUoVdxrZ_u",
      "https://drive.google.com/uc?id=127Xq-12UxZrp8x0kLmZBfVb0TILhVnC2",
      "https://drive.google.com/uc?id=12DpD0YRdPS4VgXIJcWzERUqtZRjmaoVj",
      "https://drive.google.com/uc?id=12T3dbV_CRRQl3_gDd_GhchdvrFl7RNqq",
      "https://drive.google.com/uc?id=12U6m8CqhHBYhR7pw5lSc59V7Zihoq__X",
      "https://drive.google.com/uc?id=12bKBo4O8MQpdMAT-CqLko9lwDTzMDrNu",
      "https://drive.google.com/uc?id=12VjO4v-2BKUGtAJ0tXZmX1p-j2g2qYt0",
      "https://drive.google.com/uc?id=12eBzB5FYhXHZNX8ES_rENF3LjEhGtPte",
      "https://drive.google.com/uc?id=12hvEPYGzTWLjLAwcMCb7jD3NVS1wmGcS"
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
            body: "💫 আমার বস মেহেদী এর পক্ষ থেকে রইল হাত মারার জন্য রেডি হয়ে যা 🥵🫵",
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
