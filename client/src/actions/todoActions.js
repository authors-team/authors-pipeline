import { GET_TODOS, CHECK_TODO, ITEMS_LOADING, GET_PROJECTS } from './types';
import axios from 'axios';

export const getTodos = userId => dispatch => {
	dispatch(setItemsLoading());
	return axios.get(`/api/tasks/user/${userId}`).then(res => {
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

export const getProjects = projectIds => dispatch => {
	return dispatch({
		type: GET_PROJECTS,
		payload: null
	});
};

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	};
};
