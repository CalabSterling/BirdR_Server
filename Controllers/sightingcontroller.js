let express = require('express');
const sighting = require('../models/sighting');
let router = express.Router();
let Sighting = require('../db').import('../models/sighting');

/**************************
 **** VIEW ALL UPLOADS ****
 **************************/

router.get("/", (req, res) => {
    let userid = req.user.id;
    bird.findAll({
      where: { owner_id: userid },
    })
      .then((sighting) => res.status(200).json(sighting))
      .catch((err) => res.status(500).json({ error: err }));
  });

/***********************
 **** DELETE UPLOAD ****
 **********************/

router.delete('/sighting/:id', function (req, res) {
    const query = {where: {/* this needs code */}}

    bird.destroy(query)
    .then(() => res.status(200).json({message: "Upload has been removed"}))
    .catch((err) => res.status(500).json({error: err}))
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

router.put('/update/:id', function (req, res)
{
  const updateSighting = {
      bird: req.body.sighting.bird,
      location: req.body.sighting.location,
      description: req.body.sighting.description,
      image: req.body.sighting.image,
      rarity: req.body.sighting.rarity,
  };
  
  const query = { where: { id: req.params.id, owner_id: req.user.id} };
  Sighting.update(updateSighting, query)
    .then((sightings) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));  
});

module.exports = router