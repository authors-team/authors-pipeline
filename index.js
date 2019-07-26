const express = require('express');
require('dotenv');
const request = require('request');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.post('/', (req, res) => {
	let payload = req.body;

	res.status(200).send({
		text: `Finding your tasks, ${payload.user_name}`
	});
	let data = {};
	// get tasks
	axios
		.get('https://jsonplaceholder.typicode.com/todos')
		.then(res => {
			let body = "Here's what you need to get done: \r";
			for (let i = 0; i < 5; i++) {
				if (res.data[i].completed) {
					body += '[x]  ';
				} else {
					body += '[ ]  ';
				}

				body += `${i}: ${res.data[i].title} \r`;
			}
			//console.log(data);
			return body;
		})
		.then(body => {
			const data = {
				text: body
			};
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			axios
				.post(payload.response_url, data, config)
				.then(res => {
					console.log(res);
				})
				.catch(err => console.log(err));
		});
});

const server = app.listen(process.env.PORT || PORT, () => {
	console.log(`Bot is listening on port ${PORT}`);
});
