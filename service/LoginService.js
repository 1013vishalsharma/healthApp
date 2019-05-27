const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/default');
const userModel = require('../models/User').userModel;
const userWorkoutDetailsModel = require('../models/UserWorkoutDetails').userWorkoutDetailsModel;
const userDetailsModel = require('../models/UserDetails').userDetailsModel;
const logger = require('../common/logger');
const helper = require('../common/helper');


function login(req) {
    logger.info('inside login service, method login');
    
    let emailOrNot = helper.validateEmail(req.body.loginInfo);
    let payload;
    if(emailOrNot == true){
        payload = { email: req.body.loginInfo };
    }
    else{
        payload = { username: req.body.loginInfo };
    }

    const signOpt = {
        issuer: config.ISSUER,
        subject: req.body.loginInfo,
        expiresIn: config.EXPIRES_IN,
        algorithm: config.ALGORITHM,
    };
    const token = jwt.sign(payload, config.JWT_SECRET, signOpt);
    logger.info('token created, exiting login service, login method');
    return token;
}

/**
 * Method to register the user
 * @param {*} req - The request object 
 */
async function register(req) {
    logger.info('inside login service, register method');
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    //creating hash of the password
    const hash = await bcrypt.hash(password, 10);

    userModel.create({
        username: username,
        password: hash,
        email: email
    })
        .then(user => {
            const userDetailsToAdd = {};
            userDetailsToAdd.user = user.username;
            userDetailsToAdd.firstname = req.body.firstname;
            userDetailsToAdd.lastname = req.body.lastname;

            if (req.body.age != undefined) {
                userDetailsToAdd.age = Number(req.body.age);
            }
            if (req.body.gender != undefined) {
                userDetailsToAdd.gender = req.body.gender;
            }
            if (req.body.weight != undefined) {
                userDetailsToAdd.weight = Number(req.body.weight);
            }
            if (req.body.image != undefined) {
                userDetailsToAdd.image = req.body.image;
            }

            userDetailsModel.create(
                userDetailsToAdd
            )
            .catch(err => {
                //console.log("Error in creating userdetails is: "+err);
                throw err;
            });
        })
        .catch(err => {
            //console.log("error in creating user: "+err);
            throw new Error(err);
        })

        logger.info('created user, user details and users workout data in db,' +
            + 'exiting login service method register');
        //return addedUserDetails;
    }

async function passwordReset(req) {
            logger.info('inside login service, method password reset');
            const email = req.body.email;
            await helper.sendEmail(email);
            logger.info('exiting login service, method passwordReset');
        }

async function registerViaGoogle(req, profile) {
            logger.info('inside login service, method registerViaGoogle');
            console.log(req);
            console.log(profile);
            const registerUser = {};
            const user = {};
            const { given_name, family_name, picture, email, birthday, gender } = profile;
            if (given_name != undefined) {
                registerUser.firstname = given_name
            }
            if (family_name != undefined) {
                registerUser.lastname = family_name;
            }
            if (email != undefined) {
                user.email = email;
            }
            if (picture != undefined) {
                registerUser.image = picture;
            }
            if (birthday != undefined) {
                const age = helper.getAge(birthday);
                registerUser.age = age;
            }
            if (gender != undefined) {
                registerUser.gender = gender;
            }
            user.username = given_name + '.1' + family_name;

            const createdUser = await userModel.create(user);
            registerUser.user = createdUser.username;
            await userDetailsModel.create(registerUser);

            // const workoutDetails = await userWorkoutDetailsModel.create({
            //     user: user.username,
            // });
            return user;
        }

module.exports = {
            login,
            register,
            passwordReset,
            registerViaGoogle,
        };
