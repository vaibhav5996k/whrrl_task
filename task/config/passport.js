const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName
            }

            try {
                let user = await User.findOne({ googleId: profile.id })
                if (user) {
                    done(null, user)
                }
                else {
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch (err) {
                console.error(err)
            }
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    }),


        // Facebook Passport Startegy******************************

        passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: 'http://localhost:3000/auth/facebook/callback'
        },
            async (accessToken, refreshToken, profile, cb) => {
                const newUser = {
                    facebookId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    Image: profile.profileUrl
                }
                try {
                    let user = await User.findOne({ facebookId: profile.id })
                    if (user) {
                        cb(null, user)
                    }
                    else {
                        user = await User.create(newUser)
                        cb(null, user)
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        ));
}