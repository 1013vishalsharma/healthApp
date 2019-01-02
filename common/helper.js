const mongoose = require('mongoose')
const config = require('config')
const MONGO_URI = config.get('DB_URL')
const logger = require('./logger')
const userModel = require('../models/user').userModel

function initDB() { 
    //connecting to mongo db
    mongoose.connect(MONGO_URI)
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB conn error'))
    console.log(db.collections)
}

function initData(){
    userModel.create({
        username: 'vs',
        password: 'abcd1234',
        email: 'abc@abc.com'
    })
}

function getUser(res){
    userModel.findOne({username: 'vs'}).exec((err, user2) =>{
        if(err){
            console.log('error: '+err)
        }
        else{
            console.log('reached here')
            res.send(user2)
        }
    })
    console.log('reached')
}


module.exports = {
    initDB,
    initData,
    getUser
}