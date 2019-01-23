const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('./config/default')
const workoutController = require('./controller/WorkoutController')

const router = express.Router()

router.post('/signup', passport.authenticate('signup', { session: false }),
    async (req, res, next) => {

        console.log('reached here-----------')

        const body = { _id: 'here' }
        const token = jwt.sign({ user: body }, 'secret')
        return res.json({ token })
    })

router.post('/login', passport.authenticate('login', { session: false }),
    (req, res, next) => {
        console.log('inside login method----------------')
        const payload = { email: req.body.email}
        const signOpt = {
            issuer:  config.ISSUER,
            subject:  req.body.email,
            expiresIn:  config.EXPIRES_IN,
            algorithm:  config.ALGORITHM
        }
        const token = jwt.sign(payload, config.JWT_SECRET, signOpt)
        return res.json({token})
    })


    router.get('/signin', function(req, res, next) {
        passport.authenticate('jwt', {session:false}, function(err, user, info) {
            console.log('inside signin method-----------------')
            if(err){
                next(err);
            }
            if(!user){
                next(err)
            }
            if(user){
                res.status(200).json(
                    {msg: 'user logged in'}
                );
            }  
        })(req, res, next);
    })


    router.get('/user/workout', function(req, res, next) {
        passport.authenticate('jwt', {session:false}, function (err, user, info) {
            console.log('inside workout----')
            if(!user){
                next(err)
            }
            if(err){
                next(err)
            }
            else if(user){
                workoutController.addOrUpdateWorkoutdetails(user, req, res)
            }
        })(req, res, next)
    })

    

module.exports = router