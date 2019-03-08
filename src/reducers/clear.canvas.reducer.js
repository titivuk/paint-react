import { CLEAR_CANVAS, FILL_CANVAS } from '../constants/actions';

export default function (state = true, action) {
	switch (action.type) {
		case CLEAR_CANVAS:
			return true;
		case FILL_CANVAS:
			return false;
		default:
			return state;
	};
};