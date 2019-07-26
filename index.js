const express = require('express');
require('dotenv').config();
const request = require('request');
const bodyParser = require('body-parser');
const axios = require('axios');
const airtableData = require('./airtabledata');

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.post('/', (req, res) => {
	let payload = req.body;

	if (req.body.text == 'lol') {
		res.status(200).send({ text: 'hahahahah' });
	} else if (req.body.text == 'nice') {
		res.status(200).send({
			text: 'nice',
			attachments: [
				{
					image_url:
						'https://i.kym-cdn.com/photos/images/original/000/764/965/47a.jpg'
				}
			]
		});
	} else if (req.body.text == 'dank') {
		res.status(200).send({
			text: "that's dank yo"
		});
	} else {
		res.status(200).send({
			text: `Finding your tasks, ${payload.user_name}`
		});
		let data = {};
		// get tasks
		airtableData.getPersonFromSlackID(payload.user_id).then(person => {
			console.log(person);
			airtableData
				.getTasks('all', person.id)
				.then(async tasks => {
					//console.log(tasks);
					let body = "Here's what you need to get done: \r";
					let projectIDs = [];

					tasks.forEach(async (task, index) => {
						// Get unique project IDs
						if (
							task.project[0] != '' &&
							!projectIDs.includes(task.project[0])
						) {
							//console.log(projectIDs.includes(task.project[0]));
							projectIDs.push(task.project[0]);
						}
					});
					let projects;
					await airtableData
						.getProjectsFromIDs(projectIDs)
						.then(async res => (projects = await res));
					console.log(projects);

					// build message
					let message = [
						{
							type: 'section',
							text: {
								type: 'mrkdwn',
								text: '*Here are your current tasks...*'
							}
						},
						{
							type: 'divider'
						}
					];
					projects.forEach(project => {
						// Project title
						message.push({
							type: 'section',
							text: {
								type: 'mrkdwn',
								text: `*${project.fields['Job Number']} - ${
									project.fields['Job Name']
								}*\n`
							}
						});
						// map through tasks for this project and create an attachment for each
						//attachments;
						tasks.forEach(task => {
							if (task.project == project.id) {
								let doneMark = '';
								if (task.completed) {
									doneMark = ':heavy_check_mark:    ';
								} else {
									doneMark = ':white_large_square:    ';
								}
								message.push({
									type: 'section',
									text: {
										type: 'mrkdwn',
										text: `${doneMark}    ${task.task}`
									}
									// accessory: {
									// 	type: 'button',
									// 	text: {
									// 		type: 'plain_text',
									// 		text: 'Mark Done',
									// 		emoji: true
									// 	},
									// 	value: 'click_me_123'
									// }
								});
							}
						});
					});
					console.log(message);

					return message;
				})
				.then(data => {
					const config = {
						headers: {
							'Content-Type': 'application/json'
						}
					};
					axios
						.post(payload.response_url, { blocks: data }, config)
						.then(res => {
							console.log(res);
						})
						.catch(err => console.log(err));
				});
		});
	}

	// axios
	// 	.get('https://jsonplaceholder.typicode.com/todos')
	// 	.then(res => {
	// 		let body = "Here's what you need to get done: \r";
	// 		for (let i = 0; i < 5; i++) {
	// 			if (res.data[i].completed) {
	// 				body += '[x]  ';
	// 			} else {
	// 				body += '[ ]  ';
	// 			}

	// 			body += `${i}: ${res.data[i].title} \r`;
	// 		}
	// 		//console.log(data);
	// 		return body;
	// 	})
	// 	.then(body => {
	// 		const data = {
	// 			text: body
	// 		};
	// 		const config = {
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			}
	// 		};

	// 		axios
	// 			.post(payload.response_url, data, config)
	// 			.then(res => {
	// 				console.log(res);
	// 			})
	// 			.catch(err => console.log(err));
	// 	});
});

const server = app.listen(process.env.PORT || PORT, () => {
	console.log(`Bot is listening on port ${PORT}`);
});
