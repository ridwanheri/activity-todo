const routes = require('./routes');
const express = require('express');
const cors = require('cors');
const app = express();
var corsOptions = {
    // origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// welcome
app.get('/', (req, res) => {
    res.json({ message: 'Welcome!!' });
});
// add routes to app
app.use(routes);

const db = require('./models');

db.sequelize.sync({ force: true }, () => {
    console.log('drop and create db');
});

// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
