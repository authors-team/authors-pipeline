import React, { Component, Fragment } from 'react';
import ToDoSection from './ToDoSection';
import { getTodos } from '../actions/todoActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ToDoList extends Component {
	state = {
		todaysDate: new Date().toISOString().slice(0, 10),
		today: [],
		upcoming: [],
		later: []
	};
	componentDidMount() {
		console.log('loading todos...');
		this.props.getTodos();
	}
	// componentDidMount() {
	// 	this.props.getTodos();
	// }
	// componentDidUpdate(prevProps) {
	// 	if (prevProps.todos != this.props.todos) {
	// 		let { todaysDate } = this.state;
	// 		console.log('component did update');
	// 		let upcomingTodos = [];
	// 		let laterTodos = [];
	// 		let todaysTodos = this.props.todos.filter(todo => {
	// 			if (!todo.endDate) {
	// 				laterTodos.push(todo);
	// 				return false;
	// 			} else {
	// 				if (Date.parse(todo.endDate) <= Date.parse(todaysDate)) {
	// 					return true;
	// 				} else {
	// 					upcomingTodos.push(todo);
	// 					return false;
	// 				}
	// 			}
	// 		});
	// 		this.setState({
	// 			today: todaysTodos,
	// 			upcoming: upcomingTodos,
	// 			later: laterTodos
	// 		});
	// 	}
	// }

	render() {
		const { loading } = this.props;
		if (loading || loading === undefined) {
			return (
				<div>
					<h2>Loading...</h2>
				</div>
			);
		} else {
			return (
				<Fragment>
					<ToDoSection
						header='Today'
						todos={this.props.today}
						today={this.state.todaysDate}
					/>
					<ToDoSection
						header='Upcoming'
						todos={this.props.upcoming}
						today={this.state.todaysDate}
					/>
					<ToDoSection
						header='Later'
						todos={this.props.later}
						today={this.state.todaysDate}
					/>
				</Fragment>
			);
		}
	}
}

ToDoList.propTypes = {
	getTodos: PropTypes.func.isRequired,
	todos: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
	console.log(state.todos);
	let todaysDate = new Date().toISOString().slice(0, 10);
	return {
		todos: state.todos.items,
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