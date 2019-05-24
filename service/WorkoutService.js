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

    let latestUserWorkoutDetails;
    //check if we are updating or adding the workout details
    latestUserWorkoutDetails = await userWorkoutDetails.findOne({
        user: user.username,
        workoutDate: new Date(req.body.workoutDate)
    });

    if (latestUserWorkoutDetails == undefined || latestUserWorkoutDetails == null) {
        latestUserWorkoutDetails = await userWorkoutDetails.findOne
            ({ user: user.username })
            .sort({ _id: -1 })
            .limit(1);
        
        logger.info('creating workout details for date: '+req.body.workoutDate);    
    }
    else{
        logger.info('updating workout details for date: '+req.body.workoutDate);
    }
    console.log(latestUserWorkoutDetails);

    // set type of food consumed
    let foodType = req.body.foodType;

    // set money collected for new activity
    let moneyCollected;
    if (helper.ignoreCase(foodType, 'unhealthy')) {
        moneyCollected = latestUserWorkoutDetails.moneyCollected + 10;
    }
    else {
        moneyCollected = latestUserWorkoutDetails.moneyCollected + 25;
    }

    // set the extra time left to cover up based on the type of food
    let hrsLeft = latestUserWorkoutDetails.hrsleft;
    if ((Number(req.body.workoutDuration)) < 35) {
        hrsLeft = hrsLeft + .5;
    }
    if (helper.ignoreCase(foodType, 'unhealthy') && (Number(req.body.workoutDuration)) >= 35) {
        hrsLeft = hrsLeft + .5;
    }
    else if (hrsLeft > 0 && (Number(req.body.workoutDuration)) >= 35) {
        hrsLeft = hrsLeft - .5;
    }

    // set the extra time left to cover up based on the type of food
    //let hrsLeft = (Number(latestUserWorkoutDetails.hrsLeft));
    if (req.body.workoutDuration)
        // set the workout date
        workoutDate = new Date(req.body.workoutDate);

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
