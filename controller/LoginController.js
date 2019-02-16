const loginService = require('../service/LoginService')


function login(req, res){
    var token = loginService.login(req)
    return res.json({token})
}

function register(req, res){
    var wrkout = loginService.register(req)
    return res.json(wrkout)
}

module.exports = {
    login,
    register
}