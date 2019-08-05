import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import HelpModal from './HelpModal';
import TasksLogin from './TasksLogin';
import { connect } from 'react-redux';
import { getUser } from '../actions/authActions';
import PropTypes from 'prop-types';

class TasksNavBar extends Component {
	state = {
		isOpen: false,
		helpModal: false
	};

	componentDidMount() {
		console.log('TaskNavBar loaded');
		const { userId, loggedIn } = this.props;
		console.log('User id: ', userId, loggedIn);
		if (userId) {
			this.props.getUser(userId);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.loggedIn !== this.props.loggedIn) {
			console.log('reload');
			const { userId, loggedIn } = this.props;
			console.log('User id: ', userId, loggedIn);
			if (userId) {
				this.props.getUser(userId);
			}
		}
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	toggleHelp = e => {
		e.preventDefault();
		this.setState(prevstate => ({
			helpModal: !prevstate.helpModal
		}));
	};

	render() {
		const { user, loading, userId } = this.props;
		let brandArea;
		if (!userId) {
			brandArea = <TasksLogin {...this.props} />;
		} else {
			brandArea = !loading && loading !== undefined ? user.name : '...';
		}
		return (
			<div>
				<Navbar color='white' light expand='sm' className='mb-5'>
					<NavbarBrand className='font-weight-bold'>
						<Link to='/'>AuthorsTodo</Link>
					</NavbarBrand>

					<NavbarBrand>{brandArea}</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className='ml-auto' navbar>
							<NavItem>
								<NavLink href='/' onClick={this.toggleHelp}>
									Help
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
				<HelpModal isOpen={this.state.helpModal} toggle={this.toggleHelp} />
			</div>
		);
	}
}

TasksNavBar.propTypes = {
	getUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		loading: state.auth.loading
	};
};

export default connect(
	mapStateToProps,
	{ getUser }
)(TasksNavBar);
