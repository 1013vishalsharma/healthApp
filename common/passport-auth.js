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
const helper = require('../common/helper');

var opts = {}
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
opts.issuer = config.ISSUER;


passport.use(new jwtStrategy(opts, (token, done) => {
    console.log('token: '+token);
    let body;
    let decoded = jwt.verify(token, config.JWT_SECRET);
    console.log('decoded jwt: '+decoded);
    if(token.username == undefined || token.username == null){
        body = {
            email : token.sub
        }
    }
    else{
        body = {
            username : token.sub
        }
    }
    userModel.userModel.findOne(body, (err, user) => {
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
    usernameField : 'loginInfo',
    passwordField : 'password'
},
async(loginInfo, password, done) => {
    //check wheather its email or username
    let emailOrNot = helper.validateEmail(loginInfo);

    let body;
    if(emailOrNot == true){
        body = {
            email: loginInfo
        }
    }
    else{
        body = {
            username: loginInfo
        }
    }
    const user = await userModel.userModel.findOne(body);
    console.log('-------user----------')
    console.log(user)
    if(!user){
        console.log('user not found')
        return done(null, false, {message : 'user not found'})
    }
    else{
        let isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            console.log('password incorrect')
            return done(null, false, {message : 'password entered is incorrect'})
        }
        else{
            console.log('user found')
            return done(null, user, {message : 'user logged in'})
        }
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
            return done(err, false , {message: 'user already exists with the email'});
        }
        else{
            const user1 = await loginService.registerViaGoogle(req, profile);
            return done(null, user, {message: 'user registered via google profile'});
        }
        //return done(err, user);
    });

}));