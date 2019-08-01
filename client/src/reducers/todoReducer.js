import uuid from 'uuid';
import { GET_TODOS, CHECK_TODO, ITEMS_LOADING } from '../actions/types';

const initialState = {
	items: [],
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_TODOS:
			return {
				...state,
				items: action.payload,
				loading: false
			};
		case CHECK_TODO:
			return {
				...state,
				items: state.items.map((todo, index) =>
					action.payload === todo.id
						? { ...todo, completed: !todo.completed }
						: todo
				)
			};
		case ITEMS_LOADING:
			return {
				...state,
				loading: true
			};

		default:
			return state;
	}
}
