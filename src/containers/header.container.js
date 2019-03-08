import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HeaderComponent from '../components/header.component';
import { CLEAR_CANVAS } from '../constants/actions';


class HeaderContainer extends React.PureComponent {


	onClearClick = () => {
		const { isCanvasClear } = this.props;

		if (isCanvasClear === false) {
			this.props.dispatch({ type: CLEAR_CANVAS });
		}
	}


	render() {
		const { isCanvasClear } = this.props;

		return (
			<HeaderComponent
				isCanvasClear={isCanvasClear}
				onClearClick={this.onClearClick}
			/>
		);
	}


}


HeaderContainer.propTypes = {
	isCanvasClear: PropTypes.bool.isRequired,
};


export default connect(
	(state) => ({
		isCanvasClear: state.isCanvasClear,
	}),
)(HeaderContainer);


