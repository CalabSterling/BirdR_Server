let express = require('express');
let router = express.Router();
let user = require('../db').import('../models/user');

router.post('/signup', function (req, res)
{
    user.create({
        username: req.body.user.username,
        password: req.body.user.password
    })
    .then(
        res.send("successfully logged")
    )
})

router.post('/login', function(req, res) {

    user.findOne(
        {where:{
            username: req.body.user.username
        }
    })
    .then(function loginSuccess(user) {
        if (user) {
            res.status(200).json({
                user: user
            })
        } else {
            res.status(500).json({ error: "User does not exist."})
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router