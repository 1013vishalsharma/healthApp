const userWorkoutDetails = require('../models/UserWorkoutDetails').userWorkoutDetailsModel

async function addOrUpdateWorkoutdetails(req, res, user1){
    var username1 = user1.username
    const workoutDetails = await userWorkoutDetails.findOne({user: username1})
    return workoutDetails;
}

async function updateWorkoutDetails(req, res, user1){
    var username = user1.username
    const workoutDetails = await userWorkoutDetails.update(
        {user: username},
        req.body
    )
}


module.exports = {
    addOrUpdateWorkoutdetails,
    updateWorkoutDetails
}