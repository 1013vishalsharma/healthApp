require('./app-bootstrap')
const argv = require('minimist')(process.argv.slice(2));
const swagger = require("swagger-node-express");
const config = require('config')
const express = require('express')
// const router = express.Router
const logger = require('./common/logger')
const app = express()
const port = config.get('SERVER_PORT')
const helper = require('./common/helper')
const passport = require('passport')
const bodyParser = require('body-parser')
require('./common/passport-auth')
const loginRoute = require('./routes/LoginRoute')
const workoutRoute = require('./routes/WorkoutRoute')
const cors = require('cors');

var subpath = express();

app.use(bodyParser.json())
app.use(passport.initialize())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static('dist'));

// starting db
helper.initDB()

app.use('/user', loginRoute)
app.use('/workout', workoutRoute)

app.use("/v1", subpath);
swagger.setAppHandler(subpath);

app.listen(port, () => {
    console.log('app started, listening on port ' + port)
})

logger.info('app started on ' + port)
