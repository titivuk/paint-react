export default function (state = true, action) {
	console.log(state, action);
	switch (action.type) {
		case 'CLEAR_CANVAS':
			return true;
		case 'FILL_CANVAS':
			return false;
		default:
			return state;
	};
};