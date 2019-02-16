const config = require('../config/default')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/User').userModel
const userWorkoutDetailsModel = require('../models/UserWorkoutDetails').userWorkoutDetailsModel

function login(req){
    const payload = { email: req.body.email}
    const signOpt = {
        issuer:  config.ISSUER,
        subject:  req.body.email,
        expiresIn:  config.EXPIRES_IN,
        algorithm:  config.ALGORITHM
    }
    const token = jwt.sign(payload, config.JWT_SECRET, signOpt)
    return token;
}


async function register(req){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username: username,
        password: hash,
        email: email
    })

    const workoutDetails = await userWorkoutDetailsModel.create({
        user: user.username
    })
    console.log('---------------')
    return workoutDetails;
}

module.exports = {
    login,
    register
}