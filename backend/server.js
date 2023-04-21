const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pg = require('pg');
const fs = require('fs');

const app = express();
const port = 3000;
const upload = multer();

const connectionString = 'postgres://ust:USTust123!@johnnyip.com:5434/test-geo';
const client = new pg.Client(connectionString);

const toiletsController = require('./controller/toiletsController');
const rateController = require('./controller/rateController');
const generateExcelReport = require('./functions/excel');

app.use(cors()); // Add CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/toilets', toiletsController.getAllToilets);
app.get('/toilets/:id', toiletsController.getToiletById);

app.post('/rate', rateController.saveRate);
app.get('/rate', rateController.getAllRates);
app.get('/rate/:toiletId', rateController.getRatesByToiletId);

app.get('/report', upload.none(), (req, res) => {
    let data = []

    generateExcelReport(data, (fileName) => {
        res.download(fileName, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error generating report.');
            } else {
                fs.unlink(fileName, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            }
        });
    });

});



(async () => {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
})();