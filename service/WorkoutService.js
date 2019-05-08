const logger = require('../common/logger');
const helper = require('../common/helper');
const userWorkoutDetails = require('../models/UserWorkoutDetails').userWorkoutDetailsModel;

async function getWorkoutdetails(req, res, user1) {
    logger.info('inside workoutservice, method getWorkoutdetails');
    const username1 = user1.username;
    const workoutDetails = await userWorkoutDetails.findOne({ user: username1 });
    logger.info('exiting workoutservice, method getWorkoutdetails');
    return workoutDetails;
}

async function updateWorkoutDetails(req, res, user1) {
    logger.info('inside workoutservice, method updateWorkoutDetails');
    const username = user1.username;
    const workoutDetails = await userWorkoutDetails.update(
        { user: username },
        req.body,
    );
    logger.info('workout updated, exiting workoutservice, method updateWorkoutDetails');
}

async function addWorkoutDetails(req, res, user) {
    logger.info('inside workout service, method addWorkoutDetails');
    //const moneyCollected = 10;
    const workedOutOrNot = true;
    const workoutDuration = req.body.workoutDuration;
    const hrsLeft = (Number(workoutDuration) >= .5) ? hrsLeft : (0 - .5);
    const workoutDate = new Date(req.body.workoutDate);

    //if(moneyCollected == )

    const latestUserWorkoutDetails = await userWorkoutDetails.findOne
        ( { user: user.username } ) 
        .sort( { _id : -1 } )
        .limit(1);
    console.log(latestUserWorkoutDetails);
    
    let hrsLeft = latestUserWorkoutDetails.hrsLeft;
    let moneyCollected = latestUserWorkoutDetails.moneyCollected + 10;
    let foodType = req.body.FoodType;
    if(helper.ignoreCase(foodType, 'unhealthy')){
        hrsLeft = (Number(workoutDuration) >= .5) ? hrsLeft : (hrsLeft - .5);
    }




    const addUserWorkoutDetails = await userWorkoutDetails.create({
        user: user.username,
        moneyCollected: moneyCollected,
        hrsLeft: hrsLeft,
        workoutDate: workoutDate,
        workedOutOrNot: workedOutOrNot,
        workoutType: req.body.workoutType,
        foodType: req.body.foodType,
        workoutDuration: req.body.workoutDuration, 
    });

    console.log('addUserWorkoutDetails ' + addUserWorkoutDetails);
    return addWorkoutDetails;
}


module.exports = {
    getWorkoutdetails,
    updateWorkoutDetails,
    addWorkoutDetails,
};
