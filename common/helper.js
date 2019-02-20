const mongoose = require('mongoose')
const config = require('config')
const MONGO_URI = config.get('DB_URL')
const logger = require('./logger')
const userModel = require('../models/User').userModel
const nodemailer = require('nodemailer')

function initDB() { 
    //connecting to mongo db
    mongoose.connect(MONGO_URI)
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB conn error'))
    //console.log(db.collections)
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

async function sendEmail(emailId){
    logger.info('inside helper, method sendemail');
    let account = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    logger.info('user: ' + account.user)
    logger.info('pass: ' + account.pass)

    let mailOptions = {
        from: "vishal1013sharma@gmail.com",
        to: "vishal1013sharma@gmail.com",
        subject: "Password Reset",
        text: "This is your password reset sample mail",
    };

    let info = await transporter.sendMail(mailOptions).then(info => {
        logger.info('Preview url: ' + nodemailer.getTestMessageUrl(info))});

    logger.info('mail sent, exiting helper, method sendEmail');
}


module.exports = {
    initDB,
    initData,
    getUser,
    sendEmail
}