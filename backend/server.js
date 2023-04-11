const express = require('express');
const pg = require('pg');
const app = express();
const port = 3000;

const connectionString = 'postgres://ust:USTust123!@johnnyip.com:5434/test-geo';
const client = new pg.Client(connectionString);

const toiletsController = require('./toilets/toiletsController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/toilets', toiletsController.getAllToilets);
app.get('/toilets/:id', toiletsController.getToiletById);


(async () => {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
})();