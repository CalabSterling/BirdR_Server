let express = require('express');
let router = express.Router();
let user = require('../db').import('../models/user');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

router.post('/signup', function (req, res)
{
    user.create({
        username: req.body.user.username,
        passwordhash: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then(
        function success(user) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.json({
                user: user,
                message: "User successfully created",
                token: token
            })
        }
    )
    .catch((err) => res.status(500).json({error: err}))
})

router.post('/login', function(req, res) {
    user.findOne(
        {where:{
            username: req.body.user.username
        }})
    .then(function loginSuccess(user) {
        if (user) {
            bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches) {
                if(matches){
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})

                    res.status(200).json({
                        user: user,
                        message: "user successfully logged in",
                        token: token})}
                else {
                    res.status(500).json({
                        error: "Login Unsuccessful"
                    })
                }})
        } else {
            res.status(500).json({ error: "User does not exist."})
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router