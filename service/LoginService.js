const config = require('../config/default')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

function register(req){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    
}

module.exports = {
    login
}