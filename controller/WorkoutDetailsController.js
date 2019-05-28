const workoutDetailsService = require('../service/WorkoutDetailsService');
const logger = require('../common/logger');

function getWorkoutDetailsForCurrentWeek(){
    logger.info('getting workout details for current week');
    workoutDetailsService.getWorkoutDetailsForCurrentWeek();
}

module.exports = {
    getWorkoutDetailsForCurrentWeek
}