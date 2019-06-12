const workoutDetailsService = require('../service/WorkoutDetailsService');
const logger = require('../common/logger');

async function getWorkoutDetailsForCurrentWeek(req, res, user){
    logger.info('getting workout details for current week');
    await workoutDetailsService.getWorkoutDetailsForCurrentWeek(req, res, user);
}

async function getLatestWorkoutDetails(req, res, user){
    logger.info('getting last workout details')
    const dashboardDetails = await workoutDetailsService.getLatestWorkoutDetails(req, res, user);
    res.send(dashboardDetails);
}

async function getWorkoutDetailsForCurrentMonth(req, res){
    logger.info('getting workout details for curent month');
    const monthDetails = await workoutDetailsService.getWorkoutDetailsForCurrentMonth(req, res);
    res.send(monthDetails);
}

module.exports = {
    getWorkoutDetailsForCurrentWeek,
    getLatestWorkoutDetails,
    getWorkoutDetailsForCurrentMonth,
}