import React, { Component } from 'react';
import { CustomInput, FormGroup, Collapse, Button } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import marked from 'marked';

export default class ToDoItem extends Component {
	state = {
		isOpen: false,
		rotation: -90
	};

	toggle = () => {
		this.setState(state => ({ isOpen: !state.isOpen }));
		this.rotate();
	};

	rotate = () => {
		let newRotation = this.state.rotation === 0 ? -90 : 0;
		this.setState(state => ({ rotation: newRotation }));
	};

	render() {
		let overDue =
			Date.parse(this.props.dueDate) < Date.parse(this.props.today)
				? true
				: false;
		let notes = this.props.notes ? this.props.notes.toString() : null;
		let formattedNotes;
		if (notes !== null) {
			formattedNotes = marked(notes);
		}

		let projectSlackUrl = this.props.project.slack
			? this.props.project.slack
			: null;
		let linkDisabled = {
			disabled: !projectSlackUrl ? true : false
		};
		return (
			<div className='row pt-1 align-self-center align-middle'>
				<div className={'col-md-3 text-md-right'}>
					<small
						className={`text-uppercase ${
							+overDue ? 'text-danger font-weight-bold' : ''
						}`}
					>
						{this.props.dueDate}
					</small>
				</div>
				<div className='col-md-8 d-inline  hoverDiv'>
					<FormGroup
						style={{
							textDecoration: this.props.completed && 'line-through'
						}}
						className={this.props.completed ? 'text-secondary' : ''}
					>
						<small>
							<i
								className={
									'fas fa-chevron-down mr-4 ' +
									(this.props.notes ? 'visible' : 'invisible')
								}
								onClick={this.toggle}
								style={{ transform: `rotate(${this.state.rotation}deg)` }}
							/>
						</small>
						<CustomInput
							type='checkbox'
							id={this.props.id.toString()}
							checked={this.props.completed || false}
							inline
							onChange={() => this.props.onCheckClick(this.props.id)}
							className='d-inline'
						/>
						<p className='d-inline' onClick={this.toggle}>
							{this.props.task}
						</p>
						{this.props.project && (
							<Button
								outline
								color='info'
								size='sm'
								className='float-right'
								{...linkDisabled}
								onClick={() => {
									if (projectSlackUrl) {
										window.open(projectSlackUrl, '_blank');
									}
								}}
							>
								{this.props.project.jobNumber}
							</Button>
						)}
					</FormGroup>
					{notes && (
						<Collapse isOpen={this.state.isOpen}>
							{ReactHtmlParser(formattedNotes)}
						</Collapse>
					)}
				</div>
			</div>
		);
	}
}
