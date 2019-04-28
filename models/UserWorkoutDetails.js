const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userWorkoutDetailsSchema = new schema({
    user: {
        type: mongoose.Schema.Types.String,
        ref: 'user',
        //required: true
    },
    moneyCollected: {
        type: Number,
        required: true,
        default: 0
    },
    hrsleft: {
        type: Number,
        default: 0,
        required: true
    },
    workoutDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    workedOutOrNot: {
        type: Boolean,
        default: false,
        required: true
    },
    workoutType:{
        type: String,
        default:'-',
        required: true
    },
    foodType: {
        type: String,
        default: 'Healthy',
        required: true
    },
    workoutDuration: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    modifiedAt:{
        type: Date,
        default: Date.now,
        required: true
    }
})


const userWorkoutDetailsModel = mongoose.model('UserWorkoutDetails', userWorkoutDetailsSchema)

module.exports = {
    userWorkoutDetailsModel,
    userWorkoutDetailsSchema
}