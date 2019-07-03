const workoutDetailsService = require('../service/WorkoutDetailsService');
const logger = require('../common/logger');

async function getWorkoutDetailsForCurrentWeek(req, res){
    logger.info('getting workout details for current week');
    await workoutDetailsService.getWorkoutDetailsForCurrentWeek(req, res);
}

async function getLatestWorkoutDetails(req, res){
    logger.info('getting last workout details')
    const dashboardDetails = await workoutDetailsService.getLatestWorkoutDetails(req, res);
    res.send(dashboardDetails);
}

async function getWorkoutDetailsForCurrentMonth(req, res){
    logger.info('getting workout details for curent month');
    const monthDetails = await workoutDetailsService.getWorkoutDetailsForCurrentMonth(req, res);
    res.send(monthDetails);
}

function getFullWorkoutTypeStats(req, res){
    logger.info('getting full stats for workout Type');
    workoutDetailsService.getFullWorkoutTypeStats(req, res)
                        .exec((err, result) => {
                            if(err){
                                res.status(500).send('Error fetching data');
                            }
                            else{
                                let stats = workoutDetailsService.getWorkoutStats(result);
                                res.status(200).send(stats);
                            }
                        });
}


function getCalenderViewDetails(req, res){
    logger.info('getting stats for calender view');
    workoutDetailsService.getFullWorkoutTypeStats(req, res)
                            .exec((err, result) => {
                                if(err) {
                                    res.status(500).send('Error fetching data');
                                }
                                else{
                                    let stats = workoutDetailsService.getCalenderViewDetails(result);
                                    res.status(200).send(stats);
                                }
                            })
}

module.exports = {
    getWorkoutDetailsForCurrentWeek,
    getLatestWorkoutDetails,
    getWorkoutDetailsForCurrentMonth,
    getFullWorkoutTypeStats,
    getCalenderViewDetails,
}
