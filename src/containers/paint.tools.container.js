import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PAINT_TOOLS } from '../constants/constants';
import PaintToolsComponent from '../components/paint.tools.component';
import { SWITCH_PAINT_TOOL } from '../constants/actions';


class PaintToolsContainer extends React.PureComponent {


	onPaintToolSelect = (e) => {
		const { id: paintToolKey } = e.target;

		this.props.dispatch({ type: SWITCH_PAINT_TOOL, payload: paintToolKey });
	}


	render() {
		return <PaintToolsComponent
			onPaintToolSelect={this.onPaintToolSelect}
			selectedPaintToolKey={this.props.paintToolKey}
			paintTools={Object.keys(PAINT_TOOLS).map((key) => ({
				paintToolKey: key, paintToolValue: PAINT_TOOLS[key]
			}))} />
	}


}


PaintToolsContainer.propTypes = {
	paintToolKey: PropTypes.string.isRequired,
};


export default connect(
	(state) => ({
		paintToolKey: state.paintToolKey,
	}),
)(PaintToolsContainer);



