const axios = require("axios");

// Cooldown storage
const cooldowns = new Map();

module.exports = {
  config: {
    name: "hridoy",
    version: "1.4.1",
    author: "Hridoy",
    role: 0,
    category: "Admin",
    shortDescription: "Auto profile reply with keyword + admin mention",
    countDown: 3
  },

  onStart: async function () {
    return;
  },

  onChat: async function ({ event, api }) {
    // ✅ Self message ignore (bot এর নিজের মেসেজে রিপ্লাই বন্ধ)
    if (event.senderID === api.getCurrentUserID()) return;

    const msg = (event.body || "").toLowerCase();

    // ✅ তোমার admin UID
    const adminUID = 
      ["61592284462597","61583147223219"];

    const isKeyword = msg.includes("Mehedi");
    const isAdminMention =
      event.mentions &&
      Object.keys(event.mentions).includes(adminUID);

    if (!isKeyword && !isAdminMention) return;

    // ✅ Cooldown per thread (config.countDown সেকেন্ড অনুযায়ী)
    const threadID = event.threadID;
    const now = Date.now();
    const cooldownMs = (module.exports.config.countDown || 3) * 1000;

    if (
      cooldowns.has(threadID) &&
      now - cooldowns.get(threadID) < cooldownMs
    ) {
      return;
    }

    cooldowns.set(threadID, now);

    const imageUrl = "ʟɪɴᴋ 1: https://i.imgur.com/uBE4UDM.jpeg";

    const body =
`✦━━━━━━〔 𝑷𝑹𝑶𝑭𝑰𝑳𝑬 〕━━━━━━✦
✨ NAME   ➤ ᴍᴇʜᴇᴅɪ ᴋʜᴀɴ
✨ AGE    ➤ 22+
✨ STATUS ➤ SINGLE
✨ LOC    ➤ ɢᴀᴢɪᴘᴜʀ ᴅʜᴀᴋᴀ

✦━━━━━━━〔 𝑺𝑶𝑪𝑰𝑨𝑳〕━━━━━━━✦
🌐 FB   ➤ fb.me/https://Mehedi.Choudhury31
📧 MAIL ➤ mehediprojectofficial@gmail.com
📱 WA   ➤ 01408320931

✦━━━━━━━━〔 𝑮𝑨𝑴𝑬〕━━━━━━━✦
🔫    ᴍᴀɪsʜᴀ

✦━━━━━━━━━━━━━━━━━━━━✦
⚡ SYSTEM STATUS : ᴍᴇʜᴇᴅɪ ᴋʜᴀɴ`;

    try {
      const img = await axios.get(imageUrl, {
        responseType: "stream",
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      return api.sendMessage(
        {
          body,
          attachment: img.data
        },
        threadID,
        event.messageID
      );

    } catch (err) {
      return api.sendMessage(
        body + "\n\n❌ Image load failed!",
        threadID,
        event.messageID
      );
    }
  }
};
