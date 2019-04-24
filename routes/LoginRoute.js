const express = require('express')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const logincontroller = require('../controller/LoginController')
const router = express.Router();


router.post('/login', passport.authenticate('login', {session:false}),
    (req, res, next) => {
        logincontroller.login(req, res)
    })


router.post('/register', (req, res, next) => {
    logincontroller.register(req, res);
});

router.post('registerViaGoogle', (req, res, next) => {
    console.log(req);
    console.log(res);
})


router.post('/password/reset', (req, res, next) => {
    logincontroller.passwordReset(req, res)
})



module.exports = router