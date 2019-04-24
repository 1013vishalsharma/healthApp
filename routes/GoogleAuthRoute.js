const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/google', passport.authenticate('google',  
    { scope: ['profile', 'email', 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/profile.agerange.read', 'openid', 
    'https://www.googleapis.com/auth/user.birthday.read']}, {session:false}
));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect:'/auth/google/success',
    failureRedirect: '/auth/google/faliure'}, {session:false}
));

module.exports = router;