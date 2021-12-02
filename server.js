require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3005;

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.get('/:date', (req, res) => {
	parameters = req.params

	if (parameters.date !== "favicon.ico") {
		try {
			_date_parsed = parameters.date.split('-')
			month = _date_parsed[1] - 1
			_date = new Date(_date_parsed[2], month, _date_parsed[0])
			return res.status(200).json({date: _date, timestamp: Date.parse(_date)});
		} catch (error) {
			console.log(error);
			return res.status(400).json({result: "Wrong date format"})
		}
	}
	return res.status(400).json({result: "Wrong date format"})
})


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
