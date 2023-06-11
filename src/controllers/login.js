const User = require("../db/models/User")
const bcrypt = require("bcryptjs");
const { signAccessToken, signRefreshToken } = require("../utils/jwt")

module.exports = loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const accessToken = await signAccessToken(user.email, user.id)
            const refreshToken = await signRefreshToken(user.email, user.id)
            res.status(200).json({ "message": "User login success", accessToken, refreshToken });
        }
    } catch (error) {
        res.status(422).json({ "message": "Invalid Username/Password" })
    }
}