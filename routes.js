const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/signup', passport.authenticate('signup' , {session:false}),
     async (req, res, next) => {
    //passport.authenticate('signup', async (err, user) => {
        //try{
            console.log('reached here-----------')
            // req.login(user,{ session : false }, (err) => {
            //     if(err){
            //         return next(err)
            //     }
                //const body = { _id : user._id, email : user.email }
                const body = {_id : 'here'}
                const token = jwt.sign({user:body}, 'secret')
                return res.json({token})
            })
//         }
//         catch(err){
//             return next(err)
//         }
//     })(req, res, next);
// })

module.exports = router