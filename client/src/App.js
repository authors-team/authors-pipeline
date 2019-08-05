import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import TasksNavBar from './components/TasksNavBar';
import Tasks from './components/Tasks';
import { Container } from 'reactstrap';
import ToDoList from './components/ToDoList';
import TasksLogin from './components/TasksLogin';

import { Provider } from 'react-redux';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Route exact path='/' component={Home} />

					<Route path='/tasks/:userId?' component={Tasks} />
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
