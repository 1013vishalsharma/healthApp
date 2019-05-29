const moment = require('moment');
const userWorkoutDetailsModel = require('../models/UserWorkoutDetails').userWorkoutDetailsModel;
const logger = require('../common/logger');


/**
 * Method to get all the workout details for a particular user in the current week
 * @param {*} req 
 * @param {*} res 
 * @param {*} user 
 */
async function getWorkoutDetailsForCurrentWeek(req, res, user){
    //get the start and end of the week
    const startOfWeek = moment().startOf('isoweek').toDate();
    const endOfWeek   = moment().endOf('isoweek').toDate();

    //get the workout details from the db
    const userWorkoutDetails = await userWorkoutDetailsModel
                                .find()
                                .where('workoutDate')
                                .gte(startOfWeek.toISOString())
                                .lte(endOfWeek.toISOString());

    let moneyCollectedForTheWeek;
    
    for(let i=0 ; i<userWorkoutDetails.length ; i++){
        moneyCollectedForTheWeek += userWorkoutDetails[i].moneyCollected;
    }

    console.log(userWorkoutDetails);
    console.log(moneyCollectedForTheWeek);
}

/**
 * Method to get the latest workout details for a particular user from mongo db
 * @param {*} req 
 * @param {*} res 
 * @param {*} user 
 */
async function getLatestWorkoutDetails(req, res, user){
    //get the last workout details
    const lastWorkoutDetails = await userWorkoutDetailsModel
                                .findOne()
                                .where({
                                    user: user.username
                                })
                                .sort({
                                    workoutDate: -1
                                });

    console.log(lastWorkoutDetails);
    const dashboardDetails = {
        workoutDate: lastWorkoutDetails.workoutDate,
        workoutType: lastWorkoutDetails.workoutType,
        moneyCollected: lastWorkoutDetails.moneyCollected,
        foodType: lastWorkoutDetails.foodType
    }
    return dashboardDetails;
}



module.exports = {
    getWorkoutDetailsForCurrentWeek,
    getLatestWorkoutDetails
}