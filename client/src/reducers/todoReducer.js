import uuid from 'uuid';
import { GET_TODOS, CHECK_TODO } from '../actions/types';

const initialState = {
	todos: [
		{
			id: uuid(),
			title: 'Test is this different?',
			completed: false,
			notes:
				'To create a custom checkbox, wrap a container element, like <div>, \n with a class of .custom-control and .custom-checkbox',
			endDate: '2019-07-30'
		},
		{
			id: uuid(),
			title: "Here's another task",
			completed: false,
			endDate: '2019-07-30'
		},
		{
			id: uuid(),
			title: 'This one has been completed',
			completed: true,
			endDate: '2019-07-31'
		},
		{
			id: uuid(),
			title: 'So much work to do',
			completed: false,
			endDate: '2019-07-30'
		},
		{
			id: uuid(),
			title: 'This one has been completed',
			completed: true,
			endDate: '2019-07-31'
		},
		{
			id: uuid(),
			title: 'So much work to do',
			completed: false,
			endDate: '2019-08-01'
		},
		{
			id: uuid(),
			title: 'So much work to do',
			completed: false
		}
	]
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_TODOS:
			let todaysDate = new Date().toISOString().slice(0, 10);
			console.log(todaysDate);
			let upcomingTodos = [];
			let todaysTodos = state.todos.filter(todo => {
				if (todo.endDate && todo.endDate === todaysDate) {
					return true;
				} else {
					upcomingTodos.push(todo);
					return false;
				}
			});
			return {
				...state,
				today: todaysTodos,
				upcoming: upcomingTodos
			};
		case CHECK_TODO:
			return {
				...state,
				todos: state.todos.map((todo, index) =>
					action.payload === todo.id
						? { ...todo, completed: !todo.completed }
						: todo
				)
			};

		default:
			return state;
	}
}
