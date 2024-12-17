const OpenAI = require("openai");
const key = process.env.OPENAI_KEY
const openai = new OpenAI({
    apiKey: key || 'fallback-key'
});

module.exports = openai