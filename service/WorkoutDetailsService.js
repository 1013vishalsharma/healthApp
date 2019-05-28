const moment = require('moment');

async function getWorkoutDetailsForCurrentWeek(){
    const startOfWeek = moment().startOf('isoweek').toDate();
    const endOfWeek   = moment().endOf('isoweek').toDate();

    
}

module.exports = {
    getWorkoutDetailsForCurrentWeek
}