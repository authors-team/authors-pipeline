const express = require('express');
const router = express.Router();
require('dotenv').config();

const axios = require('axios');
const airtableData = require('../../airtabledata');

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
		.then(tasks => {
			res.json(tasks);
		})
		.catch(err => res.status(404).json({ success: false }));

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
