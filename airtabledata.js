const airtable = require('airtable');
require('dotenv').config();

airtable.configure({
	endpointUrl: 'https://api.airtable.com',
	apiKey: process.env.AIRTABLE_API_KEY
});
const base = airtable.base('appNfr4wxZAQ68iEQ');

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
	return new Promise((resolve, reject) => {
		//let projects = [];
		base('Projects')
			.select({
				view: 'Active'
			})
			.eachPage(
				async (records, fetchNextPage) => {
					let projects = await records.filter(record => {
						return projectIDs.indexOf(record.id) !== -1;
					});
					//projects = [...projects, res];
					fetchNextPage();
					resolve(projects);
				},
				err => {
					if (err) {
						console.error(err);
						return;
					}
					//resolve(projects);
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
				maxRecords: 10,
				sort: [{ field: 'Project' }, { field: 'End Date' }],
				filterByFormula: "NOT({Assignee} = '')"
			})
			.eachPage(
				(records, fetchNextPage) => {
					records.forEach(record => {
						if (record.get('Task') != '')
							if (record.get('Assignee').includes(assignee)) {
								tasks.push({
									task: record.get('Task'),
									endDate: record.get('End Date'),
									project: record.get('Project'),
									completed: record.get('Done'),
									assignee: record.get('Assignee')
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

// getPersonFromSlackID('U71RK22SE').then(person => {
// 	console.log(person);
// 	getTasks('all', person.id).then(tasks => console.log(tasks));
// });

// async function init() {
// 	let projects = [];
// 	await getProjectsFromIDs([
// 		'rec21pwC2dAtCz25s',
// 		'recktjzhjNwVodSNn',
// 		'recqQmvmDYJIkf0Eu'
// 	]).then(async res => (projects = await res));

// 	console.log(projects);
// }

// init();
