import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

export default class Home extends Component {
	render() {
		return (
			<Container className='my-5'>
				<h1>Welcome to the Authors Pipeline</h1>
				<ul>
					<li>
						<Link to='/tasks'>Tasks</Link>
					</li>
				</ul>
			</Container>
		);
	}
}
