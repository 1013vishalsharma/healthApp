const workoutDetailsService = require('../service/WorkoutDetailsService');
const logger = require('../common/logger');

async function getWorkoutDetailsForCurrentWeek(req, res, user){
    logger.info('getting workout details for current week');
    await workoutDetailsService.getWorkoutDetailsForCurrentWeek(req, res, user);
}

async function getLatestWorkoutDetails(req, res, user){
    logger.info('getting last workout details')
    const dashboardDetails = await workoutDetailsService.getLatestWorkoutDetails(req, res, user);
    return dashboardDetails;
}

module.exports = {
    getWorkoutDetailsForCurrentWeek,
    getLatestWorkoutDetails,
}