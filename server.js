const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const slackbot = require('./routes/api/slackbot');
const tasks = require('./routes/api/tasks');

const app = express();

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.use('/api/slackbot', slackbot);

app.use('/api/tasks', tasks);

const server = app.listen(process.env.PORT || PORT, () => {
	console.log(`Bot is listening on port ${PORT}`);
});
