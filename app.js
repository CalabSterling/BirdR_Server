require("dotenv").config();
let express = require('express')
let app = express();
let sequelize = require('./db');

let user = require('./Controllers/usercontroller');
let sighting = require('./Controllers/sightingcontroller')

sequelize.sync();
app.use(express.json());
app.use('/sighting', sighting);
app.use('/user', user);

app.listen(3000, () => {
    console.log("app is listening");
})