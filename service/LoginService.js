const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/default');
const userModel = require('../models/User').userModel;
const userWorkoutDetailsModel = require('../models/UserWorkoutDetails').userWorkoutDetailsModel;
const logger = require('../common/logger');
const helper = require('../common/helper');


function login(req) {
    logger.info('inside login service, method login');
    const payload = { email: req.body.email };
    const signOpt = {
        issuer: config.ISSUER,
        subject: req.body.email,
        expiresIn: config.EXPIRES_IN,
        algorithm: config.ALGORITHM,
    };
    const token = jwt.sign(payload, config.JWT_SECRET, signOpt);
    logger.info('token created, exiting login service, login method');
    return token;
}


async function register(req) {
    logger.info('inside login service, register method');
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username: username,
        password: hash,
        email: email
    });

    const workoutDetails = await userWorkoutDetailsModel.create({
        user: user.username,
    });
    logger.info('created user and users workout data in db,' +
    + 'exiting login service method rgister');
    return workoutDetails;
}

async function passwordReset(req) {
    logger.info('inside login service, method password reset');
    const email = req.body.email;
    await helper.sendEmail(email);
    logger.info('exiting login service, method passwordReset');
}

module.exports = {
    login,
    register,
    passwordReset,
};
