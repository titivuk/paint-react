import React from 'react';

import './app.css';

import CanvasComponent from './components/canvas.component';
import HeaderComponent from './components/header.component';


class App extends React.Component {
	render() {
		return (
			<div className="App">
				<HeaderComponent />
				<CanvasComponent canvasSize={500} />
			</div>
		);
	}
}

export default App;
