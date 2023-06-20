const openai = require("../configs/openai");
const inputPrompt = require("../models/input-prompt")

module.exports = {
    sendText: async function (req, res) {
        const openaiAPI = openai.configuration()
        const prompt = JSON.stringify(req.body)
        try {
            const response = await openaiAPI.createCompletion(
                openai.textCompletion(prompt)
            )
            return res.status(200).json({
                data: response.data.choices[0].text
            })
        } catch (error) {
            return res.status(400).json({
                sucess: false,
                error: error.response
                ? error.response.data
                    : "there was an inssue on the server"
            })
        }
    }
}
