const express = require('express');
const passport = require('passport');
const router = express.Router();
const workoutDetailsController = require('../controller/WorkoutDetailsController');
const AuthCheck = require('../middleware/AuthCheck').authCheck;

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
            workoutDetailsController.getWorkoutDetailsForCurrentWeek(req, res, user)
        }
    })(req, res, next)
});


router.get('/latestWorkoutDetails', (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if(err){
            next(err);
        }
        else if(!user){
            next(err);
        }
        else if(user){
            workoutDetailsController.getLatestWorkoutDetails(req, res, user)
        }
    })(req, res, next)
})


router.get('/monthDetails', AuthCheck, (req, res, next) =>{
    workoutDetailsController.getWorkoutDetailsForCurrentMonth(req, res);
})

// router.get('/monthDetails', (req, res, next) => {
//     passport.authenticate('jwt', {session: false}, (err, user, info) => {
//         if(err){
//             next(err);
//         }
//         else if(!user){
//             next(err);
//         }
//         else if(user){
//             workoutDetailsController.getWorkoutDetailsForCurrentMonth(req, res, user)
//         }
//     })(req, res, next)
// })

router.get('/workoutTypeStats' , AuthCheck, (req, res, next) => {
    workoutDetailsController.getFullWorkoutTypeStats(req, res);
});


module.exports = router;