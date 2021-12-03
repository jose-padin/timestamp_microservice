require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3005;

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.get('/api/', (req, res) => {
	_date = new Date();
	return res.status(200).json({utc: _date, unix: Date.parse(_date)})
});

app.get('/api/:date', (req, res) => {
	if (req.params.date !== "favicon.ico") {
		date = req.params.date;

		if (date.indexOf('-') !== -1) {
			try {
				_date_parsed = date.split('-');
				month = _date_parsed[1] - 1;
				_date = new Date(_date_parsed[2], month, _date_parsed[0]);
				if (_date == 'Invalid Date') {
					return res.status(400).json({error: 'Invalid Date'});
				}
				return res.status(200).json({utc: _date, unix: Date.parse(_date)});
			} catch (error) {
				console.log(error);
				return res.status(400).json({result: 'Wrong date format'});
			}
		} else {
			_date = new Date(date);
			return res.status(200).json({utc: _date, unix: Date.parse(_date)});
		}
	}

	return res.status(400).json({result: 'Wrong date format'});
})


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
