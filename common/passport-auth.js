const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const config = require('../config/default')

var opts = {}
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
opts.issuer = config.ISSUER;


passport.use(new jwtStrategy(opts, (token, done) => {
    console.log('token: '+token)
    //var verified = jwt.verify(token, config.JWT_SECRET)
    //console.log('verified token: '+verified)

    userModel.userModel.findOne({ email: token.sub }, (err, user) => {
        if(err){
            return done(err, false)
        }
        if(user){
            console.log(token.sub)
            console.log('-------user----------')
            console.log(user)
            return done(null, user)
        }
        else{
            return done(null, false)
        }
    })
}))

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


passport.use('login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
},
async(email, password, done) => {
    const user = userModel.userModel.findOne({email})
    console.log('-------user----------')
    console.log(user)
    if(!user){
        console.log('user not found')
        return done(null, false, {message : 'user not found'})
    }
    else{
        console.log('user found')
        return done(null, user, {message : 'user logged in'})
    }
    return done(error)
}

))