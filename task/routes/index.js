const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// login page
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

// dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard', { fullname: req.user.displayName, imgurl: req.user.image })
})

module.exports = router