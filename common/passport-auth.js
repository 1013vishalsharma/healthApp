const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../models/user')
const bcrypt = require('bcrypt')

passport.use('signup', new LocalStrategy({
    usernameField: email,
    passwordField: password},
    async (email, password, done) => {
        try {
            const hash = await bcrypt.hash(password, 13)
            const user = await userModel.userModel.create({
                email, hash
            })
            return done(null, user)
        } catch (error) {
            done(error)
        }
    }
))