const express = require('express')
const router = express.Router()
const UserController = require('../controllers/User_Controller')
const { ensureAuth, ensureGuest, vToken } = require('../middleware/auth')

// login page
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

//register page
router.get('/register', (req, res) => {
    res.render('register', {
        layout: 'register'
    })
})

// dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard', { fullname: req.user.displayName, imgurl: req.user.image })
})


//register user route
router.post('/register', UserController.createNewUser, (req, res) => {
    res.render('/', alert("sucessfully registered"))
})


//User login
router.post('/ulogin', UserController.userLogin, (req, res) => {
    res.render('dashboard', { fullname: req.user.displayName })
})

module.exports = router