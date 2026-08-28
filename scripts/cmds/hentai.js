const axios = require("axios");

module.exports.config = {
    name: "hentai",
    version: "1.0.0",
    author: "Hridoy",
    role: 0,
    description: "Random anime image",
    category: "Image",
    countDown: 5
};

module.exports.onStart = async function ({ api, event }) {
    try {
        const res = await axios.get(
            "https://api.waifu.im/images",
            {
                params: {
                    IncludedTags: "hentai",
                    IsNsfw: "true",
                    OrderBy: "Random",
                    PageSize: 1
                },
                headers: {
                    "Accept-Version": "v7",
                    "User-Agent": "Mozilla/5.0"
                },
                timeout: 20000
            }
        );

        const imageUrl = res.data?.items?.[0]?.url;

        if (!imageUrl)
            throw new Error("No image returned");

        const image = await axios.get(imageUrl, {
            responseType: "stream",
            timeout: 30000
        });

        return api.sendMessage(
            {
                body: "",
                attachment: image.data
            },
            event.threadID,
            event.messageID
        );

    } catch (err) {
        console.error("[HENTAI]", err.message);

        return api.sendMessage(
            "❌ Image fetch failed. Please try again.",
            event.threadID,
            event.messageID
        );
    }
};
