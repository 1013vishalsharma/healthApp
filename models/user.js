const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'not a valid email']
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
    jwt: {
        type: String,
        required: true
    }
})


const userModel = mongoose.model('user',userSchema)


module.exports = {
    userSchema,
    userModel
}
