require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require("./db");

app.use(require('./middleware/headers'));

let user = require('./Controllers/usercontroller');
let sighting = require('./Controllers/sightingcontroller');
let comment = require('./Controllers/commentscontroller');

sequelize.sync();
app.use(require('./middleware/headers'));

app.use(express.json());
app.use('/sighting', sighting);
app.use('/user', user);
app.use('/comments', comment);

app.listen(3000, () => {
  console.log("app is listening");
});
