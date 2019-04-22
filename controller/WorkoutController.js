const logger = require('../common/logger')
const workoutService = require('../service/WorkoutService')

async function getWorkoutdetails(req, res, user){
    logger.info('inside Workoutcontroller for retrieving workout details')
    res.send(await workoutService.getWorkoutdetails(req, res, user))
}

async function updateWorkoutDetails(req, res, user){
    logger.info('inside Workoutcontroller for updatingworkout')    
    res.send(await workoutService.updateWorkoutDetails(req, res, user))
}

async function addWorkoutDetails(req, res, user){
    logger.info('inside Workout controller for adding a new workout details');
    const addWorkoutDetails = await workoutService.addWorkoutDetails(req, res, user);
    res.send(addWorkoutDetails);
}


module.exports = {
    getWorkoutdetails,
    updateWorkoutDetails,
    addWorkoutDetails
}