 const axios = require('axios');

let lastResponseMessageID = null;

async function handleCommand(api, event, args, message) {
    try {
        const question = args.join(" ").trim();

        if (!question) {
            return message.reply("Please provide a question to get an answer.");
        }

        const { response, messageID } = await getAIResponse(question, event.senderID, event.messageID);
        lastResponseMessageID = messageID;

        api.sendMessage(`🗡️ |ℤ𝕒𝕤𝕤𝕙𝕠 𝔾𝕚𝕝𝕘𝕒𝕞𝕖𝕤𝕙 \n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━`, event.threadID, messageID);
    } catch (error) {
        console.error("Error in handleCommand:", error.message);
        message.reply("An error occurred while processing your request.");
    }
}

async function getAnswerFromAI(question) {
    try {
        const services = [
            { url: 'https://markdevs-last-api.onrender.com/gpt4', params: { prompt: question, uid: 'your-uid-here' } },
            { url: 'http://markdevs-last-api.onrender.com/api/v2/gpt4', params: { query: question } },
            { url: 'https://markdevs-last-api.onrender.com/api/v3/gpt4', params: { ask: question } }
          
