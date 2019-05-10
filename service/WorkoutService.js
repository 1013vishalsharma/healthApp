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

/**
 * add activity to mongo
 * @param {*} req 
 * @param {*} res 
 * @param {*} user 
 */
async function addWorkoutDetails(req, res, user) {
    logger.info('inside workout service, method addWorkoutDetails');

    const latestUserWorkoutDetails = await userWorkoutDetails.findOne
        ( { user: user.username } ) 
        .sort( { _id : -1 } )
        .limit(1);
    console.log(latestUserWorkoutDetails);
    
    // set type of food consumed
    let foodType = req.body.foodType;

    // set money collected for new activity
    let moneyCollected;
    if(helper.ignoreCase(foodType, 'unhealthy')){
        moneyCollected = latestUserWorkoutDetails.moneyCollected + 10;
    }
    else{
        moneyCollected = latestUserWorkoutDetails.moneyCollected + 25;
    }

    // set the extra time left to cover up based on the type of food
    let hrsLeft = (Number(latestUserWorkoutDetails.hrsLeft));
    if(helper.ignoreCase(foodType, 'unhealthy')){
        hrsLeft = hrsLeft + .5;
    }

    // set the workout date
    const workoutDate = new Date(req.body.workoutDate);

    const addUserWorkoutDetails = await userWorkoutDetails.create({
        user: user.username,
        moneyCollected: moneyCollected,
        hrsLeft: hrsLeft,
        workoutDate: workoutDate,
        workedOutOrNot: true,
        workoutType: req.body.workoutType,
        foodType: foodType,
        workoutDuration: req.body.workoutDuration, 
    });

    console.log('addUserWorkoutDetails ' + addUserWorkoutDetails);
    return addUserWorkoutDetails;
}


module.exports = {
    getWorkoutdetails,
    updateWorkoutDetails,
    addWorkoutDetails,
};
