const client = require('../db');

exports.getAllRates = async (req, res) => {
    try {
        const queryResult = await client.query('SELECT * FROM rate');
        let result = queryResult.rows

        //Format date
        if (result.length > 0) {
            for (let item of result) {
                if (item.date != null) {
                    item['date'] = formatDate(item['date'])
                    console.log(item['date'])
                }
            }
        }

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
    let currentDate = new Date();
    console.log(currentDate)

    try {
        const query = 'INSERT INTO rate ("toiletId", rate, comment, date) VALUES ($1, $2, $3, $4)';
        await client.query(query, [body.toiletId, body.rate, body.comment, currentDate]);
        console.log('Data inserted successfully');
        console.log(body.toiletId, body.rate, body.comment);
        res.status(200).json({ status: "ok" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


function formatDate(date) {
    const addLeadingZero = (num) => (num < 10 ? '0' : '') + num;

    const day = addLeadingZero(date.getDate());
    const month = addLeadingZero(date.getMonth() + 1); // Months are 0-based
    const year = date.getFullYear().toString().slice(-2);
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    const seconds = addLeadingZero(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}