import { SWITCH_PAINT_TOOL } from '../constants/actions';
import { DEFAULT_PAINT_TOOL_KEY } from '../constants/constants';


export default function (state = DEFAULT_PAINT_TOOL_KEY, action) {
	switch (action.type) {
		case SWITCH_PAINT_TOOL:
			return action.payload;
		default:
			return state;
	};
};