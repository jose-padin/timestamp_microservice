require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3005;

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/index.html'));
})

let = responseObject = {};

app.get('/api/', (req, res) => {
	_date = new Date();
	responseObject['utc'] = _date.toUTCString();
	responseObject['unix'] = _date.getTime();
	return res.status(200).json(responseObject);
});

app.get('/api/:date', (req, res) => {
	if (req.params.date !== "favicon.ico") {
		date = req.params.date;

		if (date.includes('-')) {
			_date = new Date(date);

			responseObject['utc'] = _date.toUTCString();
			responseObject['unix'] = _date.getTime();
		} else {
			// timestamp case
			_date = new Date(parseInt(date));
		}
	}

	if (!responseObject['unix'] || !responseObject["utc"]) {
		return res.status(400).json({error: 'Invalid Date'});
	}

	return res.status(200).json(responseObject);
})


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
