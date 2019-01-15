require('./app-bootstrap')

const config = require('config')
const express = require('express')
const router = express.Router
const logger = require('./common/logger')
const app = express()
const port = config.get('SERVER_PORT')
const helper = require('./common/helper')
const passport = require('passport')
const user = require('./models/user').userModel
const mongoose = require('mongoose')
const localStrategy = require('passport-local').Strategy;
const routes = require('./routes')

app.use(passport.initialize())
//app.set('port', port)

//starting db
helper.initDB()

app.use('/', routes)

//helper.initData()

//helper.getUser()
//console.log(user1)

app.get('/', (req, res) => {
    //res.send('hello')
    helper.getUser(res)
})

app.listen(port, () => {
    console.log('app started, listening on port '+port)
})

logger.info('app started')



