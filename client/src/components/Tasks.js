import React, { Component, Fragment } from 'react';
import TasksNavBar from './TasksNavBar';
import ToDoList from './ToDoList';
import { Container } from 'reactstrap';

export default class Tasks extends Component {
	render() {
		const { params } = this.props.match;
		let loggedIn = params.userId ? true : false;
		return (
			<Fragment>
				<TasksNavBar userId={params.userId} loggedIn={loggedIn} />
				{params.userId && (
					<Container>
						<ToDoList userId={params.userId} />
					</Container>
				)}
			</Fragment>
		);
	}
}
