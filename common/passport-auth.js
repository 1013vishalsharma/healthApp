const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../models/user')
const bcrypt = require('bcrypt')

passport.use('signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password"},
     (email, password, done) => {
        try {
            const hash = bcrypt.hash(password, 13)
            console.log(hash)
            const user = userModel.userModel.create({
                email, password
            })
            return done(null, user)
        } catch (error) {
            done(error)
        }
    }
))