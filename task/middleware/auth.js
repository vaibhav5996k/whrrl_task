const jwt = require('jsonwebtoken')

module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        else {
            res.redirect('/')
        }
    },

    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        }
        else {
            return next()
        }
    },

    vToken: function (req, res, next) {
        const token = req.header('auth-token')
        if (!token) {
            return res.status(400).send("Access Denied").redirect('/')
        }
        else {
            try {
                const verified = jwt.verify(token, process.env.TOKEN_SECRET)
                req.user = verified
                res.redirect('/dashboard')
                next()
            } catch (error) {
                res.status(400).send('Invalid Token')
            }
        }

    }
}