const logger = require('../common/logger')
const loginService = require('../service/LoginService')


function login(req, res){
    logger.info('inside login controller, method login')
    var token = loginService.login(req)
    return res.json({token})
}

function register(req, res){
    logger.info('inside login controller, method register');
    var wrkout = loginService.register(req)
    return res.json(wrkout)
}

async function passwordReset(req, res){
    logger.info('inside login controller, method passwordreset')
    await loginService.passwordReset(req)
    console.log('reached here');
    return res.sendStatus(200);
}

async function registerViaGoogle(req, res){
    logger.info('inside login controller, method registerViaGoogle');
}

module.exports = {
    login,
    register,
    passwordReset,
    registerViaGoogle,
}