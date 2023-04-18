const client = require('../db');

exports.getAllToilets = async (req, res) => {
    try {
        const queryResult = await client.query(`SELECT t.*, CAST(ROUND(AVG(CASE WHEN r.rate != 0 THEN r.rate ELSE NULL END), 1) AS DECIMAL(10,1)) as average_rating
        FROM toilets t
        LEFT JOIN rate r ON t.id = r."toiletId"
        WHERE t.type = 'PUBLIC TOILETS' 
        GROUP BY t.id
        ORDER BY t.id;`);
        let result = queryResult.rows
        result.map(row => row['average_rating'] = row['average_rating'] != null ? parseFloat(row['average_rating']) : 0)
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
        const queryResult = await client.query(`SELECT t.*, CAST(ROUND(AVG(r.rate), 1) AS DECIMAL(10,1)) as average_rating
        FROM toilets t
        LEFT JOIN rate r ON t.id = r."toiletId"
        WHERE t.type = 'PUBLIC TOILETS' AND t.id = ${id}
        GROUP BY t.id
        ORDER BY t.id;`);
        
        let result = queryResult.rows
        result.map(row => row['average_rating'] = row['average_rating'] != null ? parseFloat(row['average_rating']) : 0)
        console.log(queryResult.rows)
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
