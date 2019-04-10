const express = require('express')
const passport = require('passport')
const workoutController = require('../controller/WorkoutController')
const router = express.Router()

router.get('/', (req, res, next) =>{
    passport.authenticate('jwt', {session:false}, (err, user, info)=>{
        if(err){
            next(err);
        }
        else if(!user){
            next(err);
        }
        else if(user){
            workoutController.getWorkoutdetails(req, res, user)
        }
    })(req, res, next)
})

router.post('/update', (req, res, next) => {
    passport.authenticate('jwt', {session:false}, (err, user, info) => {
        if(err){
            next(err)
        }
        else if(!user){
            next(err)
        }
        else if(user){
            workoutController.updateWorkoutDetails(req, res, user)
        }
    })(req, res, next)
} )

module.exports = router;