import React from 'react';
import ReactDOM from 'react-dom';

class Comment extends React.Component {
	render(){

		
		return(
			<div className="comment">
				<p className="comment-header">Anne Droid</p>
				<p className="comment-body">
					I wanna know what love is
				</p>

				<div className="comment-footer">
					<a href="#" className="comment-footer-delete">
						Delete Comment
					</a>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Comment />, document.getElementById('story-app')
);