const moment = require('moment');
const userWorkoutDetailsModel = require('../models/UserWorkoutDetails').userWorkoutDetailsModel;
const logger = require('../common/logger');
const _ = require('lodash');


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
    const wdate = new Date(lastWorkoutDetails.workoutDate);
    //const wdate = 'hello'
    const dashboardDetails = {
        workoutDate: wdate,
        workoutType: lastWorkoutDetails.workoutType,
        moneyCollected: lastWorkoutDetails.moneyCollected,
        hrsleft: lastWorkoutDetails.hrsleft
    }
    return dashboardDetails;
}


/**
 * Method to get the workout details for the whole month
 * @param {*} req 
 * @param {*} res 
 * @param {*} user 
 */
async function getWorkoutDetailsForCurrentMonth(req, res){

    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();

    const monthDetails = await userWorkoutDetailsModel.find()
                                .where({
                                    user: req.userData.username
                                })
                                .where('workoutDate')
                                .gte(startOfMonth)
                                .lte(endOfMonth);
    console.log(monthDetails);
    return monthDetails;
                                
}


function getFullWorkoutTypeStats(req, res){
    logger.info('inside service method to get full workout stats')
    let workoutDetails = userWorkoutDetailsModel.find()
                                .where({
                                    user: req.userData.username
                                })
    return workoutDetails;
}

function getWorkoutStats(result){
    let stats = {};
    _.forEach(result, (workoutDetails, index) => {
        if(workoutDetails.workoutType in stats == false){
            stats[workoutDetails.workoutType] = 1;
        }
        else{
            stats[workoutDetails.workoutType] += 1;
        }
    })
    console.log(stats);
    return stats;
}

module.exports = {
    getWorkoutDetailsForCurrentWeek,
    getLatestWorkoutDetails,
    getWorkoutDetailsForCurrentMonth,
    getFullWorkoutTypeStats,
    getWorkoutStats,
}