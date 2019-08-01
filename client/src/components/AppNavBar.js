import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Container
} from 'reactstrap';
import HelpModal from './HelpModal';

export default class AppNavBar extends Component {
	state = {
		isOpen: false,
		helpModal: false
	};

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
		return (
			<div>
				<Navbar color='white' light expand='sm' className='mb-5'>
					<NavbarBrand href='/' className='font-weight-bold'>
						AuthorsTodo
					</NavbarBrand>
					<NavbarBrand>Chris Zachary</NavbarBrand>
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
