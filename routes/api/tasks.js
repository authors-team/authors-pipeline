const express = require('express');
const router = express.Router();
require('dotenv').config();

const axios = require('axios');
const airtableData = require('../../utils/airtabledata');

//Routes

// @route   GET all tasks
// @desc    retrieve all outstanding tasks from airtable
// @access  Public
router.get('/', (req, res) => {
	res.status(200).send('All your tasks');
});

// @route   GET task by task id
// @desc    get one task by id
// @access  Public
router.get('/:id', (req, res) => {
	res.status(200).send(`Task id: ${req.params.id}`);
});

// @route   GET tasks by user id
// @desc    retrieve all outstanding tasks for a single user from airtable
// @access  Public
router.get('/user/:id', (req, res) => {
	airtableData
		.getTasks('all', req.params.id)
		.then(async tasks => {
			let projectIds = [];

			tasks.forEach(async (task, index) => {
				// Get unique project IDs
				if (task.project[0] != '' && !projectIds.includes(task.project[0])) {
					projectIds.push(task.project[0]);
				}
			});

			let projects;
			await airtableData
				.getProjectsFromIDs(projectIds)
				.then(async res => (projects = await res));

			res.json({
				tasks: tasks,
				projects: projects
			});
		})
		.catch(err => res.status(404).json({ error: err.message }));

	//res.status(200).send(`All tasks for user id: ${req.params.id}`);
});

// @route   PUT complete/uncomplete a task by id
// @desc    mark task as completed/uncompleted in airtable
// @access  Public
router.put('/:id', (req, res) => {
	airtableData.checkTask(req.params.id).then(completed => {
		res.status(200).json({ success: true });
	});
});

module.exports = router;
