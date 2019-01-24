const loginService = require('../service/LoginService')


function login(req, res){
    var token = loginService.login(req)
    return res.json({token})
}

function register(req, res){
    loginService.register(req)
}

module.exports = {
    login,
    register
}