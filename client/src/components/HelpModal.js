import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class HelpModal extends Component {
	render() {
		const helpUrl = 'https://authorsprojects.slack.com/messages/CLZC84RGQ'; // authors pipeline support channel

		return (
			<div>
				<Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
					<ModalHeader toggle={this.props.toggle}>
						Are you struggling? Let us help you
					</ModalHeader>
					<ModalBody p-2>
						<img
							src='https://media.giphy.com/media/fdLR6LGwAiVNhGQNvf/giphy.gif'
							alt='help me help you'
							className='mb-3 img-fluid'
						/>
						<div className='my-4'>
							<h4 className='text-center mb-3'>How to use:</h4>
							<ol>
								<li>
									Click the <strong>toggle buttons</strong> to show and hide
									details and to show/hide lists.
								</li>
								<li>
									Mark tasks complete by clicking the <strong>checkbox</strong>.
								</li>
								<li>
									Tasks are sorted by due date. Overdue tasks are placed first
									and marked in{' '}
									<span className='text-danger font-weight-bold'> red</span>.
								</li>
							</ol>
						</div>
						<hr />
						<div className='my-2'>
							<div className='my-1 help-question'>
								<p className='my-1'>
									<strong>Q. Why can't I create a new task?</strong>
								</p>
								<p>
									This todo list pulls tasks from our project management system
									in airtable. For now, new tasks can only be added inside that
									system. This list is for displaying and completing tasks only.
								</p>
							</div>
							<div className='my-1 help-question'>
								<p className='my-1'>
									<strong>Q. Why can't I create a new task?</strong>
								</p>
								<p>
									This todo list pulls tasks from our project management system
									in airtable. For now, new tasks can only be added inside that
									system. This list is for displaying and completing tasks only.
								</p>
							</div>
						</div>

						<hr />
						<div className='text-center'>
							<p>
								<strong>Found a bug?</strong>
							</p>
							<Button onClick={() => window.open(helpUrl, '_blank')}>
								Report
							</Button>
						</div>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default HelpModal;
