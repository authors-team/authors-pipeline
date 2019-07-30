import React, { Component, Fragment } from 'react';
import ToDoSection from './ToDoSection';
import { getTodos } from '../actions/todoActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ToDoList extends Component {
	state = {
		loading: true
	};
	componentDidMount() {
		this.props.getTodos();
		this.setState({
			loading: false
		});
	}
	render() {
		//const { today, upcoming } = this.props.todo;
		console.log(this.props.todo.today);
		if (this.state.loading) {
			return (
				<div>
					<h2>Loading...</h2>
				</div>
			);
		} else {
			return (
				<Fragment>
					<ToDoSection header='Today' todos={this.props.todo.today} />
					<ToDoSection header='Upcoming' todos={this.props.todo.upcoming} />
				</Fragment>
			);
		}
	}
}

ToDoList.propTypes = {
	getTodos: PropTypes.func.isRequired,
	todo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	todo: state.todo
});

export default connect(
	mapStateToProps,
	{ getTodos }
)(ToDoList);
