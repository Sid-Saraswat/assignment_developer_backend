const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
    signAccessToken: (userEmail,userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userEmail
            }
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '15m',
                issuer: 'localhost',
                audience: userId,
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                    return
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            req.payload = payload
            next()
        })
    },
    signRefreshToken: (userEmail,userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userEmail
            }
            const secret = process.env.REFRESH_TOKEN_SECRET
            const options = {
                expiresIn: '24h',
                issuer: 'localhost',
                audience: userId,
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) return reject(createError.Unauthorized())
                const userEmail = payload.userEmail
                const userId = payload.aud
                resolve({userEmail, userId})
            }
            )
        })
    },
}
