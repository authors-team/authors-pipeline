import { GET_TODOS, CHECK_TODO, ITEMS_LOADING } from './types';
import axios from 'axios';

export const getTodos = () => dispatch => {
	dispatch(setItemsLoading());
	return axios.get('/api/tasks/user/recyLRMuMMXdd7csu').then(res => {
		return dispatch({
			type: GET_TODOS,
			payload: res.data
		});
	});
};

export const checkTodo = id => dispatch => {
	axios.put(`/api/tasks/${id}`).then(res =>
		dispatch({
			type: CHECK_TODO,
			payload: id
		})
	);
};

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	};
};
