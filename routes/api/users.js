const express = require('express');
const router = express.Router();
require('dotenv').config();

const axios = require('axios');
const airtableData = require('../../utils/airtabledata.js');

// Routes

// @route   GET all users
// @desc    Retrieve all people from airtable People
// @access  Public
router.get('/', (req, res) => {
	res.status(200).send('One day this wil return something but not now');
});

// @route   GET user by id
// @desc    Retrieve all people from airtable People
// @access  Public
router.get('/:id', (req, res) => {
	airtableData
		.getUserById(req.params.id)
		.then(user => {
			res.json(user);
		})
		.catch(err => res.status(404).json({ message: 'User not found' }));
});

module.exports = router;
