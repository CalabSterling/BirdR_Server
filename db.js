const Sequelize = require('sequelize');
const sequelize = new Sequelize('BirdR', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to database');
    },
    function(err){
        console.log(err);
    }
)
module.exports = sequelize;