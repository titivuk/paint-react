import { SWITCH_PAINTING_COLOR } from '../constants/actions';


export default function (state = '#000000', action) {
	switch (action.type) {
		case SWITCH_PAINTING_COLOR:
			return action.payload;
		default:
			return state;
	};
};