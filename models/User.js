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
}).index({username:1, email:1})


const userModel = mongoose.model('user',userSchema)


module.exports = {
    userSchema,
    userModel
}
