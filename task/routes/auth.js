const express = require('express')
const passport = require('passport')
const router = express.Router()

// auth with google 
// get auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// google auth callback
// get auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard')
    })

//google logout 
//get /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})



// auth with facebook 
// get auth/facebook
router.get('/facebook', passport.authenticate('facebook'))

// facebook auth callback
// get auth/facebook/callback
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard')
    })



module.exports = router