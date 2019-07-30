import { GET_TODOS, CHECK_TODO } from './types';

export const getTodos = () => {
	return {
		type: GET_TODOS
	};
};

export const checkTodo = id => {
	return {
		type: CHECK_TODO,
		payload: id
	};
};
