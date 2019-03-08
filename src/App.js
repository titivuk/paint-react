import React from 'react';

import './app.css';

import CanvasContainer from './containers/canvas.container';
import HeaderContainer from './containers/header.container';


class App extends React.Component {
	render() {
		return (
			<div className="App">
				<HeaderContainer />
				<CanvasContainer canvasSize={500} />
			</div>
		);
	}
}

export default App;
