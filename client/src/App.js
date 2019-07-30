import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavBar from './components/AppNavBar';
import { Container } from 'reactstrap';
import ToDoList from './components/ToDoList';

import { Provider } from 'react-redux';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<div>
				<AppNavBar />
				<Container>
					<ToDoList />
				</Container>
			</div>
		</Provider>
	);
}

export default App;
