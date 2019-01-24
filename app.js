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
const bodyParser = require('body-parser')
require('./common/passport-auth')
const loginRoute = require('./routes/LoginRoute')

app.use(bodyParser.json());
app.use(passport.initialize())
app.use(bodyParser.urlencoded({extended:true}))

//starting db
helper.initDB()

//app.use('/', routes)
app.use('/user', loginRoute)
//helper.initData()

app.listen(port, () => {
    console.log('app started, listening on port '+port)
})

logger.info('app started')



