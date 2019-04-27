const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const config = require('../config/default')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const loginService = require('../service/LoginService');

var opts = {}
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
opts.issuer = config.ISSUER;


passport.use(new jwtStrategy(opts, (token, done) => {
    console.log('token: '+token)
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
}));


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
}));


passport.use(new GoogleStrategy ({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
async function(req, accessToken, refreshToken, profile, done) {
    console.log(profile);
    const user = await userModel.userModel.findOne({email: profile.email}, async (err, user) => {
        if(user){
            console.log("user already exists with email: " +user);
            return done(null, false , {message: 'user already exists with the email'});
        }
        else{
            const user1 = await loginService.registerViaGoogle(req, profile);
            return done(null, user, {message: 'user registered via google profile'});
        }
        //return done(err, user);
    });

}));