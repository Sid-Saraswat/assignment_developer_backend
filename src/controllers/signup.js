const User = require("../db/models/User");
const { signAccessToken, signRefreshToken } = require("../utils/jwt")

module.exports = saveUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("No field should be empty")
        }
        if (name.length > 50 || email.length > 50) {
            throw new Error("Name , Email cannot be more than 50 characters long")
        }
        const addUser = new User({ name, email, password })
        const savedUser = await addUser.save()
        const accessToken = await signAccessToken(savedUser.email, savedUser.id)
        const refreshToken = await signRefreshToken(savedUser.email, savedUser.id)
        res.status(201).json({ "message": "User added successfully", accessToken, refreshToken })
    } catch (error) {
        const message = error.message
        res.status(422).json({ message })
    }
}