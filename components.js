import React from 'react';
import ReactDOM from 'react-dom';

class StoryBox extends React.Component {
	render(){
		return( <div><h1>Story Boxing 2</h1></div> );
	}
}

ReactDOM.render(
	<StoryBox />, document.getElementById('story-app')
);