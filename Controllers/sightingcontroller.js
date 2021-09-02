let express = require('express');
let router = express.Router();
let bird = require('../db').import('../models/sighting');

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


module.exports = router