require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

const port = process.env.PORT || 3005;

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/index.html'));
})

let = responseObject = {};

app.get('/api/', (req, res) => {
	let date = new Date();
	responseObject['unix'] = date.getTime();
	responseObject['utc'] = date.toUTCString();
	return res.status(200).json(responseObject);
});

app.get('/api/:date', (req, res) => {
	if (req.params.date !== "favicon.ico") {
		let date_input = req.params.date;
		let unixFormat = date_input * 1;
		let date = isNaN(unixFormat) ? new Date(date_input) : new Date(unixFormat);

		if (date == 'Invalid Date') {
			return res.status(400).json({error: 'Invalid Date'});
		}

		responseObject['unix'] = date.getTime();
		responseObject['utc'] = date.toUTCString();
	}
	return res.status(200).json(responseObject);
})


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
