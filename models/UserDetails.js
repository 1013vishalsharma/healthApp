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
    sex: {
        type: String,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    image: {
        type: Buffer,
        required: false
    }
});

const userDetailsModel = mongoose.model('userDetails', userDetailsSchema);

module.exports = {
    userDetailsModel,
    userDetailsSchema
} 