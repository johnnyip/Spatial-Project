const client = require('../db');

exports.getAllToilets = async (req, res) => {
    try {
        const queryResult = await client.query('SELECT * FROM toilets WHERE type= $1', ['PUBLIC TOILETS']);
        let result = queryResult.rows
        result.map(row => row['average_rating']=4.5)
        console.log(result);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getToiletById = async (req, res) => {
    const id = req.params.id;

    try {
        const queryResult = await client.query('SELECT * FROM toilets WHERE id = $1', [id]);

        if (queryResult.rows.length > 0) {
            res.status(200).json(queryResult.rows[0]);
        } else {
            res.status(404).json({ error: 'Public toilet not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
