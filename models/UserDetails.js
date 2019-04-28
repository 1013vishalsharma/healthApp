const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userDetailsSchema = new schema({
    user: {
        type: String,
        ref: 'user',
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    height: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    image: {
        type: String,
        required: false
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
});

const userDetailsModel = mongoose.model('userDetails', userDetailsSchema);

module.exports = {
    userDetailsModel,
    userDetailsSchema
} 