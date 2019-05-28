const express = require('express');
const passport = require('passport');
const router = express.Router();
const workoutDetailsController = require('../controller/WorkoutDetailsController');

/**
 * api to get details for the current week
 */
router.get('/weekDetails', (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info)=>{
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
});