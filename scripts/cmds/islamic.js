const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "islamic",                    // নাম চেঞ্জ করা হয়েছে "islamic"
    version: "1.0.6",
    role: 2,
    author: "MEHEDI HASAN MIRAZ",
    description: "Islamic Video Send - Special Collection",
    category: "18+",
    usages: "prefix islamic",
    cooldowns: 5
  },

  onStart: async function ({ event, api }) {
    const videos = [
      "https://files.catbox.moe/gxzx6o.mp4",
      "https://files.catbox.moe/pleil0.mp4",
      "https://files.catbox.moe/85loi7.mp4",
      "https://files.catbox.moe/kzm86f.mp4",
      "https://files.catbox.moe/2o7t3u.mp4",
      "https://files.catbox.moe/ptqgsv.mp4",
      "https://files.catbox.moe/2iqate.mp4",
      "https://files.catbox.moe/hrzu9w.mp4",
      "https://files.catbox.moe/c9tkml.mp4",
      "https://files.catbox.moe/aa6k4b.mp4",
      "https://files.catbox.moe/2qi8kh.mp4",
      "https://files.catbox.moe/5j9jzd.mp4",
      "https://files.catbox.moe/p3s1ws.mp4",
      "https://files.catbox.moe/s9dxj1.mp4",
      "https://files.catbox.moe/wi1cja.mp4",
      "https://files.catbox.moe/uj2loh.mp4",
      "https://files.catbox.moe/e0g7gz.mp4",
      "https://files.catbox.moe/4qn5gn.mp4",
      "https://files.catbox.moe/uwr98x.mp4",
      "https://files.catbox.moe/xhzyny.mp4",
      "https://files.catbox.moe/uhcc8w.mp4",
      "https://files.catbox.moe/c87q7z.mp4",
      "https://files.catbox.moe/h7kbx8.mp4",
      "https://files.catbox.moe/2ezl54.mp4",
      "https://files.catbox.moe/ogoua9.mp4",
      "https://files.catbox.moe/0gp8u8.mp4",
      "https://files.catbox.moe/ono27o.mp4",
      "https://files.catbox.moe/i98jdy.mp4",
      "https://files.catbox.moe/9er2yq.mp4",
      "https://files.catbox.moe/p4639r.mp4"
    ];

    try {
      const randomIndex = Math.floor(Math.random() * videos.length);
      const randomVideo = videos[randomIndex];

      await api.sendMessage({
        body: `🌷__𝐓𝐨𝐦𝐚𝐤𝐞 𝐏𝐞𝐲𝐞 𝐆𝐞𝐥𝐞 𝐊𝐨𝐧𝐨 𝐀𝐤 𝐑𝐮𝐩𝐤𝐨𝐭𝐡𝐚𝐫 𝐆𝐨𝐥𝐩𝐞𝐫 𝐌𝐨𝐭𝐨 𝐁𝐨𝐝𝐥𝐞 𝐉𝐚𝐛𝐞 𝐀 𝐉𝐢𝐛𝐨𝐧𝐧__🌷`,
        attachment: await global.utils.getStreamFromURL(randomVideo)
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error("ভিডিও পাঠাতে সমস্যা:", error);
      api.sendMessage("🍂🍓__মাইশা আপু 😔 প্লিজ ভিডিও টা দাও গো__🍂🍓", event.threadID, event.messageID);
    }
  }
};
