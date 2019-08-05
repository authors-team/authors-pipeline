import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class TasksLogin extends Component {
	state = {
		inputUserId: ''
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.history.push(`/tasks/${this.state.inputUserId}`);
	};

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input
						type='text'
						value={this.state.inputUserId}
						name='inputUserId'
						onChange={this.onChange}
					/>
					<button type='submit'>Get Tasks</button>
				</form>
			</div>
		);
	}
}

export default withRouter(TasksLogin);
