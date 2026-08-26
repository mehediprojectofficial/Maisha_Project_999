const axios = require("axios");

const getBaseApi = async () => {
  const res = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
  return res.data.mahmud;
};

module.exports = {
  config: {
		shortDescription: "Llama (AI)", // auto-added: was missing, caused blank entry in help
    name: "llama",
    version: "1.7",
    author: "MahMUD",
    countDown: 5,
    role: 0,
    category: "AI",
    guide: "{pn} <question>"
  },

  onStart: async function ({ api, event, args }) {
   
    const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 77, 85, 68);
    if (module.exports.config.author !== obfuscatedAuthor) {
      return api.sendMessage(
        "❌ | You are not authorized to change the author name.",
        event.threadID,
        event.messageID
      );
    }
    if (!args.length) 
      return api.sendMessage("❌ | Please provide a question.", event.threadID, event.messageID);

    const question = args.join(" ");
    const apiUrl = await getBaseApi();

    try {
      const response = await axios.post(
        `${apiUrl}/api/llama`,
        { question },
        { headers: { "Content-Type": "application/json" } }
      );

      const replyText = response?.data?.response || response?.data?.error || "❌ | No response from API.";
      api.sendMessage(replyText, event.threadID, event.messageID);

    } catch (err) {
      console.error(err);
      api.sendMessage("🥹error, contact Kakashi", event.threadID, event.messageID);
    }
  }
};
