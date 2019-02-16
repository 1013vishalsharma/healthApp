require('./app-bootstrap')

const config = require('config')
const express = require('express')
const router = express.Router
const logger = require('./common/logger')
const app = express()
const port = config.get('SERVER_PORT')
const helper = require('./common/helper')
const passport = require('passport')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('./common/passport-auth')
const loginRoute = require('./routes/LoginRoute')
const workoutRoute = require('./routes/WorkoutRoute')

app.use(bodyParser.json());
app.use(passport.initialize())
app.use(bodyParser.urlencoded({extended:true}))

//starting db
helper.initDB()

//app.use('/', routes)
app.use('/user', loginRoute)
app.use('/workout', workoutRoute)
//helper.initData()

app.listen(port, () => {
    console.log('app started, listening on port '+port)
})

logger.info('app started')