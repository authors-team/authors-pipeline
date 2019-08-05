import { GET_USER, AUTH_LOADING } from '../actions/types';

const initialState = {
	user: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_USER:
			return {
				...state,
				user: action.payload,
				loading: false
			};
		case AUTH_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
