const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userWorkoutDetailsSchema = new schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    moneyCollected: {
        type: number,
        required: false,
        default: 0
    },
    hrsleft: {
        type: number,
        default: 0,
        required: false
    },
    workoutTime: {
        type: Date,
        default: null,
        required: false
    },
    workedOutOrNot: {
        type: boolean,
        default: false,
        required: false
    },
    workoutType:{
        type: string,
        default:'-',
        required: false
    }
})


const userWorkoutDetailsModel = mongoose.model('UserWorkoutDetails', userWorkoutDetailsSchema)

module.exports = {
    userWorkoutDetailsModel,
    userWorkoutDetailsSchema
}