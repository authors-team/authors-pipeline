const airtable = require('airtable');
require('dotenv').config();

airtable.configure({
	endpointUrl: 'https://api.airtable.com',
	apiKey: process.env.AIRTABLE_API_KEY
});
const base = airtable.base(process.env.AIRTABLE_BASE);

const tasksTable = base('Tasks');
const peopleTable = base('People');

exports.getUserById = userId => {
	let user;
	return new Promise((resolve, reject) => {
		peopleTable.find(userId, (err, record) => {
			if (err) {
				console.error(err);
				return;
			}
			user = {
				id: record.id,
				name: record.get('Name'),
				email: record.get('Email'),
				slackUserName: record.get('Slack Username'),
				company: record.get('Company'),
				active: record.get('Active')
			};
			resolve(user);
		});
	});
};

exports.getPersonFromSlackID = slackID => {
	return new Promise((resolve, reject) => {
		let person;
		base('People')
			.select({
				maxRecords: 1,
				filterByFormula: `{Slack ID} = '${slackID}'`,
				fields: ['Name']
			})
			.eachPage(
				(records, fetchNextPage) => {
					person = {
						id: records[0].id,
						name: records[0].get('Name')
					};
					fetchNextPage();
				},
				err => {
					if (err) {
						console.error(err);
						return;
					}
					resolve(person);
				}
			);
	});
};

exports.getProjectsFromIDs = projectIDs => {
	let projects = [];
	return new Promise((resolve, reject) => {
		//let projects = [];
		base('Projects')
			.select({
				view: 'Active'
			})
			.eachPage(
				async (records, fetchNextPage) => {
					let res = await records.filter(record => {
						return projectIDs.indexOf(record.id) !== -1;
					});
					//records = [...records, res];
					res.forEach(record => {
						projects.push({
							id: record.id,
							name: record.get('Job Name'),
							jobNumber: record.get('Job Number'),
							active: record.get('Active'),
							slack: record.get('Slack #'),
							company: record.get('Company')
						});
					});
					fetchNextPage();
					resolve(projects);
				},
				err => {
					if (err) {
						console.error(err);
						return;
					}
					//resolve(records);
				}
			);
	});
};

exports.getTasks = (scope, assignee) => {
	let tasks = [];
	return new Promise((resolve, reject) => {
		base('Tasks')
			.select({
				// get the first 10 records
				maxRecords: 20,
				sort: [{ field: 'End Date' }, { field: 'Project' }],
				filterByFormula: "NOT({Assignee} = '')"
			})
			.eachPage(
				(records, fetchNextPage) => {
					records.forEach(record => {
						if (record.get('Task') != '')
							if (record.get('Assignee').includes(assignee)) {
								tasks.push({
									id: record.id,
									task: record.get('Task'),
									endDate: record.get('End Date'),
									project: record.get('Project'),
									completed: record.get('Done'),
									assignee: record.get('Assignee'),
									notes: record.get('Notes')
								});
							}
						//console.log(record.get('Task'));
					});

					fetchNextPage();
				},
				err => {
					if (err) {
						console.error(err);
						return;
					}
					resolve(tasks);
				}
			);
	});
};

exports.checkTask = recordId => {
	return new Promise((resolve, reject) => {
		tasksTable.find(recordId, async (err, record) => {
			if (err) {
				console.error(err);
				return;
			}
			completed = await !record.get('Done');
			console.log(completed);
			await tasksTable.update(
				recordId,
				{
					Done: completed
				},
				(err, record) => {
					if (err) {
						console.error(err);
						return;
					}
					resolve(record.get('Done'));
				}
			);
		});
	});
};

//getUserById('recyLRMuMMXdd7csu').then(res => console.log(res));
