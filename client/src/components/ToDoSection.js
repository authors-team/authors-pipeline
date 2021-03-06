import React, { Component } from 'react';
import ToDoItem from './ToDoItem';
import { Collapse } from 'reactstrap';
import { checkTodo } from '../actions/todoActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ToDoSection extends Component {
	state = {
		isOpen: true,
		rotation: 0
	};
	toggle = () => {
		this.setState(state => ({ isOpen: !state.isOpen }));
		this.rotate();
	};

	rotate = () => {
		let newRotation = this.state.rotation === 0 ? -90 : 0;
		this.setState(state => ({ rotation: newRotation }));
	};
	onCheckClick = id => {
		this.props.checkTodo(id);
	};

	render() {
		const { todos, projects } = this.props;
		return (
			<div className='my-5'>
				<div className='row'>
					<div className='col-md-3 text-md-right'>
						<h1>{this.props.header}</h1>
					</div>
					<div className='col-md-8 align-self-center'>
						<small>
							<i
								className='fas fa-chevron-down mr-2'
								onClick={this.toggle}
								style={{ transform: `rotate(${this.state.rotation}deg)` }}
							/>
						</small>
						<hr
							style={{
								float: 'right',
								width: '95%'
							}}
						/>
					</div>
				</div>
				<Collapse isOpen={this.state.isOpen}>
					{todos.map(
						(
							{ task, completed, notes, id, endDate, project },
							index,
							todos
						) => {
							let dueDate =
								index > 0 && endDate === todos[index - 1].endDate
									? ''
									: endDate;
							dueDate = !endDate ? '' : dueDate;
							let projectInfo = projects.find(proj => proj.id === project[0]);
							console.log(projectInfo);
							return (
								<ToDoItem
									dueDate={dueDate}
									today={this.props.today}
									task={task}
									completed={completed}
									notes={notes}
									onCheckClick={this.onCheckClick}
									key={id}
									id={id}
									project={projectInfo}
								/>
							);
						}
					)}
				</Collapse>
			</div>
		);
	}
}

ToDoSection.propTypes = {
	checkTodo: PropTypes.func.isRequired,
	todos: PropTypes.array.isRequired,
	projects: PropTypes.array.isRequired
};

// const mapStateToProps = state => ({
// 	todo: state.todo
// });

export default connect(
	null,
	{ checkTodo }
)(ToDoSection);
