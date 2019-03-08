export default function (state = true, action) {
	switch (action.type) {
		case 'CLEAR_CANVAS':
			return true;
		default:
			return state;
	};
};