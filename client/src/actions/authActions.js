import { GET_USER, AUTH_LOADING } from './types';
import axios from 'axios';

export const getUser = userId => dispatch => {
	dispatch(setAuthLoading());
	return axios.get(`/api/users/${userId}`).then(res => {
		return dispatch({
			type: GET_USER,
			payload: res.data
		});
	});
};

export const setAuthLoading = () => {
	return {
		type: AUTH_LOADING
	};
};
