let express = require('express');
let router = express.Router();
let Sighting = require('../db').import('../models/sighting');

router.get('/sighting', function (req, res)
{
    res.send('Practice works')
})

router.post('/sighting', validateSession, (req, res) => {
    const sightingEntry = {
        bird: req.body.sighting.bird,
        location: req.body.sighting.location,
        description: req.body.sighting.description,
        image: req.body.sighting.image,
        rarity: req.body.sighting.rarity,
        owner_id: req.user.id
    }
    Sighting.create(sightingEntry)
    .then(sighting => res.status(200).json(sighting))
    .catch(err => res.status(500).json({ error: err }))
})

router.get('/mine', validateSession, (req, res) => {
    let userid = req.user.id
    Sighting.findAll({
        where: { owner_id: userid }
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }))
})

module.exports = router