import React from 'react';
import ReactDOM from 'react-dom';


class CommentBox extends React.Component {

	constructor(){
		super(); //call super to set up 'this' from parent constructor in React.Component

		// set intial state for show/hide comments
		this.state = {
			showComments:false
		};
	}

	render() {
		const comments = this._getComments();
		let commentNodes;
		let buttonText = 'Show Comments';

		// show/hide comments based on state
		if(this.state.showComments){
			commentNodes = <div className="comment-list">{comments}</div>;
		}

		// switch button text based on current state
		if(this.state.showComments){
			buttonText = 'Hide Comments';
		}

		return(
				<div className="comment-box">
					<h3>Comments</h3>
					<h4 className="comment-count">
						{this._getCommentsTitle(comments.length)}
					</h4>
					<button onClick={this._handleClick.bind(this)}>
						{buttonText}
					</button>
					{commentNodes}
				</div>

		);
	}

	_handleClick(){
		this.setState({
			showComments: !this.state.showComments
		});
	}

	_getComments() {

		// can be replaced with an ajax call
		const commentList = [
			{id:1, author: 'Jerry', body: 'I like cheese'},
			{id:2, author: 'Tom', body: 'I like mice!'}
		];

		return commentList.map( (comment)=> {
			return(
				<Comment 
					author={comment.author} body={comment.body} key={comment.id} />
			);
		});

	}

	_getCommentsTitle(commentCount) {
		if(commentCount === 0){
			return 'No comments yet';
		}else if(commentCount === 1){
			return '1 comment';
		}else{
			return `${commentCount} comments`;
		}
	}

}

class Comment extends React.Component {
	render(){
		return(
			<div className="comment">
				<p className="comment-header">
					{this.props.author}
				</p>
				<p className="comment-body">
					{this.props.body}
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
	<CommentBox />, document.getElementById('comment-app')
);

