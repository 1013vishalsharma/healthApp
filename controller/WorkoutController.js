const workoutService = require('../service/WorkoutService')

async function addOrUpdateWorkoutdetails(req, res, user){
    //var workoutDetails = workoutService.addOrUpdateWorkoutdetails(req, res, user)
    //console.log(workoutDetails)
    //console.log(JSON.stringify(workoutDetails))
    res.send(await workoutService.addOrUpdateWorkoutdetails(req, res, user))
}

async function updateWorkoutDetails(req, res, user){
    res.send(await workoutService.updateWorkoutDetails(req, res, user))
}


module.exports = {
    addOrUpdateWorkoutdetails,
    updateWorkoutDetails
}