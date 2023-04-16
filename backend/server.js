const express = require('express');
const pg = require('pg');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

const connectionString = 'postgres://ust:USTust123!@johnnyip.com:5434/test-geo';
const client = new pg.Client(connectionString);

const toiletsController = require('./controller/toiletsController');
const rateController = require('./controller/rateController');

app.use(cors()); // Add CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/toilets', toiletsController.getAllToilets);
app.get('/toilets/:id', toiletsController.getToiletById);

app.post('/rate', rateController.saveRate);
app.get('/rate', rateController.getAllRates);
app.get('/rate/:toiletId', rateController.getRatesByToiletId);




(async () => {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
})();