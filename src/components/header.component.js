import React from 'react';
import PropTypes from 'prop-types';

import ColorPickerContainer from '../containers/color.picker.container';
import PaintToolsContainer from '../containers/paint.tools.container';


class HeaderComponent extends React.PureComponent {


	render() {
		return (
			<div className="header">
				<ColorPickerContainer />
				<PaintToolsContainer />
				<button
					className="clear-canvas-button"
					onClick={this.props.onClearClick}
					disabled={this.props.isCanvasClear}>
					Clear
				</button>
			</div>
		);
	}


}


HeaderComponent.propTypes = {
	onClearClick: PropTypes.func.isRequired,
	isCanvasClear: PropTypes.bool.isRequired,
};


export default HeaderComponent;


