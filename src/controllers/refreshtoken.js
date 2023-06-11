const createError = require('http-errors')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../utils/jwt")

module.exports = refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userDetails = await verifyRefreshToken(refreshToken)
        const accessToken = await signAccessToken(userDetails.userEmail, userDetails.userId)
        const refToken = await signRefreshToken(userDetails.userEmail, userDetails.userId)
        res.status(200).json({ "message": "Tokens Renewed!!", accessToken, refreshToken: refToken });
    } catch (error) {
        res.status(422).json({ "message": "Invalid Username/Password" })
    }
}