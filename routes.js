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

    

module.exports = router