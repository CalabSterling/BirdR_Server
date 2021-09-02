let express = require('express');
const sighting = require('../models/sighting');
let router = express.Router();
let bird = require('../db').import('../models/sighting');

router.get('/sighting', function (req, res)
{
    res.send('Practice works')
})

router.put('/update/:id', function (req, res)
{
  const updateSighting = {
      bird: req.body.sighting.bird,
      location: req.body.sighting.location,
      description: req.body.sighting.description,
      image: req.body.sighting.image,
      rarity: req.body.sighting.rarity,
  },
  const query = { where: { id: req.params.id, owner_id: req.user.id} };
  Sighting.update(updateSighting, query)
    .then((sightings) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));  
});

module.exports = router