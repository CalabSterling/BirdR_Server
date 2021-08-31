let express = require('express');
let router = express.Router();
let bird = require('../db').import('../models/sighting');

router.get('/sighting', function (req, res)
{
    res.send('Practice works')
})
module.exports = router