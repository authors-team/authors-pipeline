import React, { Component, Fragment } from 'react';
import ToDoSection from './ToDoSection';
import { getTodos } from '../actions/todoActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ToDoList extends Component {
	state = {
		todaysDate: new Date().toISOString().slice(0, 10)
	};
	componentDidMount() {
		const { userId } = this.props;
		console.log('loading todos...');
		this.props.getTodos(userId);
	}

	render() {
		const { loading } = this.props;
		if (loading || loading === undefined) {
			return (
				<div>
					<h2>Loading...</h2>
				</div>
			);
		} else if (this.props.todos.length === 0) {
			return (
				<div>
					<h1>No Tasks Found</h1>
				</div>
			);
		} else {
			return (
				<Fragment>
					{this.props.today.length > 0 && (
						<ToDoSection
							header='Today'
							todos={this.props.today}
							today={this.state.todaysDate}
							projects={this.props.projects}
						/>
					)}
					{this.props.upcoming.length > 0 && (
						<ToDoSection
							header='Upcoming'
							todos={this.props.upcoming}
							today={this.state.todaysDate}
							projects={this.props.projects}
						/>
					)}
					{this.props.later.length > 0 && (
						<ToDoSection
							header='Later'
							todos={this.props.later}
							today={this.state.todaysDate}
							projects={this.props.projects}
						/>
					)}
				</Fragment>
			);
		}
	}
}

ToDoList.propTypes = {
	getTodos: PropTypes.func.isRequired,
	todos: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	later: PropTypes.array.isRequired,
	upcoming: PropTypes.array.isRequired,
	today: PropTypes.array.isRequired
};

const mapStateToProps = state => {
	//console.log(state.todos);
	let todaysDate = new Date().toISOString().slice(0, 10);
	return {
		todos: state.todos.items,
		projects: state.todos.projects,
		later: state.todos.items.filter(todo => !todo.endDate),
		today: state.todos.items.filter(
			todo => todo.endDate && Date.parse(todo.endDate) <= Date.parse(todaysDate)
		),
		upcoming: state.todos.items.filter(
			todo => todo.endDate && Date.parse(todo.endDate) > Date.parse(todaysDate)
		),
		loading: state.todos.loading
	};
};
export default connect(
	mapStateToProps,
	{ getTodos }
)(ToDoList);
