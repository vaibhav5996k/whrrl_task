const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    createNewUser: async (req, res, next) => {
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(req.body.password, salt)

        try {
            User.findOne({ emailId: req.body.emailId }, async (err, user) => {
                if (err) {
                    console.log(err.message)
                }
                if (user) {
                    var err = new Error('A user with that email has already registered. Please use a different email..')
                    err.status = 400;
                    return next(err);
                } else {
                    const user = new User({
                        displayName: req.body.displayName,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        emailId: req.body.emailId,
                        mobileNumber: req.body.mobileNumber,
                        password: hasedPassword
                    });
                    const result = await user.save();
                    res.status(200).render("login");
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    },

    userLogin: async (req, res) => {
        const user = await User.findOne({ emailId: req.body.emailId })
        if (!user) {
            return res.status(400).send("Email is not found")
        }
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) {
            return res.status(400).send('Invalid password')
        }
        const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send(token)
    }
}
