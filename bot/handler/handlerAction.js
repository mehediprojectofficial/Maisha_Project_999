const createFuncMessage = global.utils.message;
const handlerCheckDB = require("./handlerCheckData.js");

module.exports = (
  api,
  threadModel,
  userModel,
  dashBoardModel,
  globalModel,
  usersData,
  threadsData,
  dashBoardData,
  globalData
) => {
  const handlerEvents = require(
    process.env.NODE_ENV == "development"
      ? "./handlerEvents.dev.js"
      : "./handlerEvents.js"
  )(
    api,
    threadModel,
    userModel,
    dashBoardModel,
    globalModel,
    usersData,
    threadsData,
    dashBoardData,
    globalData
  );

  // ═══════════ Anti-Spam / Flood Protection state (new) ═══════════
  const floodTracker = {}; // { senderID: { timestamps: [], mutedUntil: 0 } }

  return async function (event) {
    // ✅ Anti-Inbox Protection
    if (
      global.GoatBot.config.antiInbox == true &&
      (event.senderID == event.threadID ||
        event.userID == event.senderID ||
        event.isGroup == false) &&
      (event.senderID || event.userID || event.isGroup == false)
    )
      return;

    const message = createFuncMessage(api, event);

    // ══════════ Anti-Spam / Flood Protection ══════════
    if (
      ["message", "message_reply"].includes(event.type)
    ) {
      const antiSpamCfg = global.GoatBot.config.antiSpam || {};
      const senderID = event.senderID || event.userID;
      const adminIDs = global.GoatBot.config.adminBot || [];
      const isAdmin = adminIDs.includes(senderID);

      if (
        antiSpamCfg.enable &&
        senderID &&
        !(antiSpamCfg.ignoreAdmin && isAdmin)
      ) {
        const now = Date.now();
        const timeFrameMs = (antiSpamCfg.timeFrameSeconds ?? 8) * 1000;
        const muteMs = (antiSpamCfg.muteSeconds ?? 20) * 1000;
        const maxMessages = antiSpamCfg.maxMessages ?? 6;

        if (!floodTracker[senderID])
          floodTracker[senderID] = { timestamps: [], mutedUntil: 0 };
        const tracker = floodTracker[senderID];

        if (tracker.mutedUntil > now) {
          // Still muted, silently drop the message
          return;
        }

        // Keep only timestamps within the current time frame
        tracker.timestamps = tracker.timestamps.filter(t => now - t < timeFrameMs);
        tracker.timestamps.push(now);

        if (tracker.timestamps.length > maxMessages) {
          tracker.mutedUntil = now + muteMs;
          tracker.timestamps = [];
          if (antiSpamCfg.notifyOnMute) {
            try {
              await message.reply(
                `⚠️ তুমি অনেক দ্রুত মেসেজ পাঠাচ্ছো! ${Math.round(muteMs / 1000)} সেকেন্ডের জন্য বট তোমার মেসেজে সাড়া দিবে না।`
              );
            } catch (e) { /* ignore reply failure */ }
          }
          return;
        }
      }
    }

    // ══════════ Maintenance Mode ══════════
    const maintenanceCfg = global.GoatBot.config.maintenanceMode || {};
    if (maintenanceCfg.enable) {
      const senderID = event.senderID || event.userID;
      const adminIDs = global.GoatBot.config.adminBot || [];
      const isAdmin = adminIDs.includes(senderID);
      if (!(maintenanceCfg.allowAdminBot && isAdmin) && ["message", "message_reply"].includes(event.type)) {
        try {
          await message.reply(maintenanceCfg.message || "🛠️ Bot is under maintenance.");
        } catch (e) { /* ignore reply failure */ }
        return;
      }
    }

    await handlerCheckDB(usersData, threadsData, event);

    const handlerChat = await handlerEvents(event, message);
    if (!handlerChat) return;

    const {
      onAnyEvent,
      onFirstChat,
      onStart,
      onChat,
      onReply,
      onEvent,
      handlerEvent,
      onReaction,
      typ,
      presence,
      read_receipt
    } = handlerChat;

    onAnyEvent();

    switch (event.type) {
      case "message":
      case "message_reply":
      case "message_unsend":
        onFirstChat();
        onChat();
        onStart();
        onReply();
        break;

      case "event":
        handlerEvent();
        onEvent();
        break;

      case "message_reaction":
        onReaction();

        // 💣 React-Unsend System
        try {
          const cfg = global.GoatBot.config.reactUnsend || {};
          const adminIDs = global.GoatBot.config.adminBot || [];
          const isAdmin = adminIDs.includes(event.userID || event.senderID);

          if (
            cfg.enable &&
            cfg.emojis?.includes(event.reaction) &&
            (!cfg.onlyAdmin || isAdmin)
          ) {
            await api.unsendMessage(event.messageID);
          }
        } catch (err) {
          console.error("❌ React-Unsend Error:", err);
        }

        break;

      case "typ":
        typ();
        break;

      case "presence":
        presence();
        break;

      case "read_receipt":
        read_receipt();
        break;

      default:
        break;
    }
  };
};
