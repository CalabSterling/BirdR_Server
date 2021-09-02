let express = require('express');
let router = express.Router();
let user = require('../db').import('../models/user');
let jwt = require('jsonwebtoken');
 
router.post('/signup', function (req, res)
{
    user.create({
        username: req.body.user.username,
        password: req.body.user.password
    })
    .then(
        function signupSuccess(user) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
 
            res.json({
                user: user,
                message: 'Yay! New user!',
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }))
});
 
router.post('/login', function(req, res) {
 
    user.findOne(
        {where:{
            username: req.body.user.username
        }
    })
    .then(function loginSuccess(user) {
        if (user) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
            res.status(200).json({
                user: user,
                message: "Yay! Logged in!",
                sessionToken: token
            })
        } else {
            res.status(500).json({ error: "User does not exist."})
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});
 
module.exports = router