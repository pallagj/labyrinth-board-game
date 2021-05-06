const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(
    session({
        secret: 'secret'
    })
);

// File upload
const fileUpload = require('express-fileupload');
app.use(fileUpload(undefined));
app.set('rootDir', __dirname)

// Load routing
require('./route/index')(app);

app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
});

app.listen(3000, function() {
    console.log('Port :3000');
});

// Load json files
const fs = require('fs');


fs.readFile('./map/cards.json', (err, data) => {
    if (err) throw err;
    cards = JSON.parse(data);
    app.set('cards', cards)
});

fs.readFile('./map/cardtypes.json', (err, data) => {
    if (err) throw err;
    cardtypes = JSON.parse(data);
    app.set('cardtypes', cardtypes)
});

fs.readFile('./map/map.json', (err, data) => {
    if (err) throw err;
    map = JSON.parse(data);
    app.set('map', map)
});
