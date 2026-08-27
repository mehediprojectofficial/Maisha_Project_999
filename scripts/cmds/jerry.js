const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "jerry",                    // চাইলে "jerry18", "jerry_hot" বা অন্য কিছু করতে পারো
    version: "1.0.1",
    role: 2,
    author: "MEHEDI HASAN MIRAZ",
    description: "18+ VIDEO SEND - Jerry Collection",
    category: "18+",
    usages: "prefix jerry",
    cooldowns: 5
  },

  onStart: async function ({ event, api }) {
    const videos = [
      "https://files.catbox.moe/e24w2r.mp4",
      "https://files.catbox.moe/ic2m71.mp4",
      "https://files.catbox.moe/k2htk5.mp4",
      "https://files.catbox.moe/okt3sj.mp4",
      "https://files.catbox.moe/50j4cm.mp4",
      "https://files.catbox.moe/kpjaqr.mp4",
      "https://files.catbox.moe/6qe414.mp4",
      "https://files.catbox.moe/mlwz0t.mp4",
      "https://files.catbox.moe/2jt724.mp4",
      "https://files.catbox.moe/imk4e1.mp4",
      "https://files.catbox.moe/af70kz.mp4",
      "https://files.catbox.moe/9uk6la.mp4",
      "https://files.catbox.moe/09ym2b.mp4",
      "https://files.catbox.moe/xhkune.mp4",
      "https://files.catbox.moe/a13mmt.mp4",
      "https://files.catbox.moe/q7z5cw.mp4",
      "https://files.catbox.moe/w1fm5p.mp4",
      "https://files.catbox.moe/c52amx.mp4",
      "https://files.catbox.moe/11qgmt.mp4",
      "https://files.catbox.moe/8vrwxl.mp4",
      "https://files.catbox.moe/me0joh.mp4",
      "https://files.catbox.moe/lriy35.mp4"
    ];

    try {
      const randomIndex = Math.floor(Math.random() * videos.length);
      const randomVideo = videos[randomIndex];

      await api.sendMessage({
        body: `🍒__𝙏𝙤𝙢𝙖𝙠𝙚 𝙋𝙖𝙬 𝙔𝙖 𝙀𝙠 𝘼𝙠𝙖𝙨𝙝 𝙋𝙤𝙧𝙞𝙢𝙖𝙣 𝙄𝙘𝙝𝙝𝙖  𝘼𝙢𝙖𝙍__✨🌷`,
        attachment: await global.utils.getStreamFromURL(randomVideo)
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error("ভিডিও পাঠাতে সমস্যা:", error);
      api.sendMessage("🍂🍓__মাইশা আপু 😔 প্লিজ ভিডিও টা দাও গো__🍂🍓", event.threadID, event.messageID);
    }
  }
};
