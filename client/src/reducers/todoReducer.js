import {
	GET_TODOS,
	CHECK_TODO,
	ITEMS_LOADING,
	GET_PROJECTS
} from '../actions/types';

const initialState = {
	items: [],
	projects: [],
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_TODOS:
			return {
				...state,
				items: action.payload.tasks,
				projects: action.payload.projects,
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
		case GET_PROJECTS:
			return {
				...state,
				projects: action.payload,
				loading: false
			};

		default:
			return state;
	}
}
