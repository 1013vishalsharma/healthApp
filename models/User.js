const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
     username: {
         type: String,
         required: true, 
         unique: true
     },
    email: {
        type: String,
        required: [true, 'not a valid email'],
        unique:true
    },
    password: {
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
    }
}).index({username:1, email:1})


const userModel = mongoose.model('user',userSchema)


module.exports = {
    userSchema,
    userModel
}
