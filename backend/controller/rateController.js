const client = require('../db');

exports.getAllRates = async (req, res) => {
    try {
        const queryResult = await client.query('SELECT * FROM rate');
        let result = queryResult.rows
        // result.map(row => row['average_rating']=4.5)
        console.log(result);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getRatesByToiletId = async (req, res) => {
    const toiletId = req.params.toiletId;

    try {
        const queryResult = await client.query('SELECT * FROM rate WHERE "toiletId" = $1', [toiletId]);

        if (queryResult.rows.length > 0) {
            console.log(queryResult.rows)
            res.status(200).json(queryResult.rows);
        } else {
            res.status(404).json({ error: 'Public toilet not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.saveRate = async (req, res) => {
    const body = req.body;
    console.log(body)

    try {
        const query = 'INSERT INTO rate ("toiletId", rate) VALUES ($1, $2)';
        await client.query(query, [body.toiletId, body.rate]);
        console.log('Data inserted successfully');
        console.log(body.toiletId, body.rate);
        res.status(200).json({ status: "ok" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
