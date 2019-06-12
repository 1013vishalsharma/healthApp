const passport = require('passport');

function authCheck(req, resp, next) {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if(err){
            next(err);
        }
        else if(!user){
            next(err);
        }
        else if(user){
            req.userData = user;
            return next();
        }
    })
    (req, resp, next);
}

module.exports = {
    authCheck
}