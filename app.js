let express = require('express')
let app = express();
let sequelize = require('./db');

let sighting = require('./Controllers/sightingcontroller');

sequelize.sync();
app.use(express.json());
app.use('/sighting', sighting);

app.listen(3000, () => {
    console.log("app is listening on develop branch");
})

