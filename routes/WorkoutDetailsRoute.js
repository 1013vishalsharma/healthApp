const express = require('express');
const passport = require('passport');
const router = express.Router();
const workoutDetailsController = require('../controller/WorkoutDetailsController');
const AuthCheck = require('../middleware/AuthCheck').authCheck;

/**
 * api to get details for the current week
 */
router.get('/weekDetails', AuthCheck, (req, res, next) => {
    workoutDetailsController.getWorkoutDetailsForCurrentWeek(req, res)
});


router.get('/latestWorkoutDetails', AuthCheck, (req, res, next) => {
    workoutDetailsController.getLatestWorkoutDetails(req, res)
});


router.get('/monthDetails', AuthCheck, (req, res, next) =>{
    workoutDetailsController.getWorkoutDetailsForCurrentMonth(req, res);
});

router.get('/workoutTypeStats' , AuthCheck, (req, res, next) => {
    workoutDetailsController.getFullWorkoutTypeStats(req, res);
});

router.get('/calenderViewDetails', AuthCheck, (req, res, next) => {
    workoutDetailsController.getCalenderViewDetails(req, res);
})


module.exports = router;