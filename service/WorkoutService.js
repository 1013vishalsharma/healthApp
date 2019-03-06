const logger = require('../common/logger')
const userWorkoutDetails = require('../models/UserWorkoutDetails').userWorkoutDetailsModel

async function getWorkoutdetails(req, res, user1){
    logger.info('inside workoutservice, method getWorkoutdetails')
    var username1 = user1.username
    const workoutDetails = await userWorkoutDetails.findOne({user: username1})
    logger.info('exiting workoutservice, method getWorkoutdetails')
    return workoutDetails;
}

async function updateWorkoutDetails(req, res, user1){
    logger.info('inside workoutservice, method updateWorkoutDetails')
    var username = user1.username;
    const workoutDetails = await userWorkoutDetails.update(
        {user: username},
        req.body
    )
    logger.info('workout updated, exiting workoutservice, method updateWorkoutDetails')
}


module.exports = {
    getWorkoutdetails,
    updateWorkoutDetails
}