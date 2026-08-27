const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "1.3.2",
    author: "Mᴏʜᴀᴍᴍᴀᴅ Aᴋᴀsʜ",
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText =
`╭─ 👑 Oᴡɴᴇʀ Iɴғᴏ 👑 ─╮
│ 👤 Nᴀᴍᴇ       : ᴍᴇʜᴇᴅɪ ᴋʜᴀɴ
│ 🧸 Nɪᴄᴋ       : ᴍᴀɪsʜᴀ
│ 🎂 Aɢᴇ        : 22+
│ 💘 Rᴇʟᴀᴛɪᴏɴ : 𝐒𝐢𝐧𝐠𝐥𝐞
│ 🎓 Pʀᴏғᴇssɪᴏɴ : 𝐒𝐭𝐮𝐝𝐞𝐧𝐭
│ 📚 Eᴅᴜᴄᴀᴛɪᴏɴ : 𝐈𝐧𝐭𝐞𝐫 2𝐧ᴅ 𝐘ᴇᴀʀ
│ 🏡 Lᴏᴄᴀᴛɪᴏɴ : 𝐃𝐡𝐚𝐤𝐚 - 𝐆𝐚𝐳𝐢𝐩𝐮𝐫
├─ 🔗 Cᴏɴᴛᴀᴄᴛ ─╮
│ 📘 Facebook  : 𝐰𝐰𝐰:/𝐌𝐞𝐡𝐞𝐝𝐢.𝐂𝐡𝐨𝐰𝐝𝐡𝐮𝐫𝐲
│ 💬 Messenger : 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤:/𝐌𝐞𝐡𝐞𝐝𝐢.𝐊𝐡𝐚𝐧
│ 📞 WhatsApp  : 𝐰𝐡𝐚𝐭:/01408320931
╰────────────────╯`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpeg");

    await fs.ensureDir(cacheDir);

    // Image link
    const imgLink = "https://i.imgur.com/yF26wf8.jpeg";

    if (await fs.pathExists(imgPath)) {
      await fs.remove(imgPath);
    }

    const file = fs.createWriteStream(imgPath);

    request(imgLink)
      .on("error", (err) => {
        console.error("Image download error:", err);
        api.sendMessage(
          "❌ Owner image download করা যায়নি।",
          event.threadID,
          event.messageID
        );
      })
      .pipe(file);

    file.on("finish", async () => {
      file.close();

      try {
        await api.sendMessage(
          {
            body: ownerText,
            attachment: fs.createReadStream(imgPath)
          },
          event.threadID,
          event.messageID
        );

        setTimeout(async () => {
          if (await fs.pathExists(imgPath)) {
            await fs.remove(imgPath);
          }
        }, 5000);

      } catch (err) {
        console.error("Send image error:", err);
      }
    });

    file.on("error", (err) => {
      console.error("File write error:", err);
    });
  }
};
