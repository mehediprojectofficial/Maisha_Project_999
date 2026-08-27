module.exports = {
	config: {
		name: "groupNoti",
		version: "1.5",
		author: "EryXenX",
		category: "events"
	},

	onStart: async function ({ event, message, usersData }) {
		const type = event.logMessageType;
		const data = event.logMessageData || {};

		if (type === "log:thread-name") {
			return async () => {
				const name = data.name || data.new_name;
				if (name) {
					await message.send(`✨ গ্রুপের নাম পরিবর্তন হয়েছে\n➤ নতুন নাম: ${name}`);
				} else {
					await message.send(`✨ গ্রুপের নাম মুছে ফেলা হয়েছে`);
				}
			};
		}

		if (type === "log:thread-icon") {
			return async () => {
				const emoji = data.thread_icon || data.icon || "❓";
				await message.send(`😀 গ্রুপের ইমোজি পরিবর্তন হয়েছে\n➤ নতুন ইমোজি: ${emoji}`);
			};
		}

		if (type === "log:thread-color") {
			return async () => {
				await message.send(`🎨 গ্রুপের থিম পরিবর্তন হয়েছে`);
			};
		}

		if (type === "log:user-nickname") {
			return async () => {
				const uid = data.participant_id || data.participantID;
				const name = await usersData.getName(uid);
				const nick = data.nickname;

				if (nick) {
					await message.send(`✏️ ${name} এর নিকনেম পরিবর্তন হয়েছে\n➤ নতুন নিকনেম: ${nick}`);
				} else {
					await message.send(`✏️ ${name} এর নিকনেম মুছে ফেলা হয়েছে`);
				}
			};
		}
	}
};
