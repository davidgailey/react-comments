import React from 'react';
import ReactDOM from 'react-dom';


class CommentBox extends React.Component {

	constructor(){
		super(); //call super to set up 'this' from parent constructor in React.Component

		// set intial state for show/hide comments
		this.state = {
			showComments:false,
			comments: [
				{id:1, author: 'Jerry', body: 'I like cheese'},
				{id:2, author: 'Tom', body: 'I like mice!'}
			]
		};
	}

	componentWillMount() {
		this._fetchComments();  //Should I instead do this in componentDidUpdate? https://medium.com/@baphemot/understanding-reactjs-setstate-a4640451865b
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
				<div className="comment-box" style={{margin: '2em'}}>
					<h3>React Comments</h3>
					
					<CommentForm 
						title="What do you have to say?"
						authorLabel="What is your name?"
						bodyLabel="Please type your comment here."
						submitButtonText="Add Comment"
						/>

					<div className="card bg-dark mb-3" style={{padding: '1em',color:'#fff'}}>
						<div className="card-body">
							<h5 className="card-title">{this._getCommentsTitle(comments.length)}</h5>
							<button onClick={this._handleClick.bind(this)} 
									className="btn btn-secondary btn-lg mb-3">
								{buttonText}
							</button>
							{commentNodes}
						</div>
					</div>
				</div>

		);
	}

	componentDidMount() {
		//setInterval(()=> this._fetchComments(), 60000);
	} 

	_handleClick(){
		this.setState({
			showComments: !this.state.showComments
		});
	}

	_getComments() {

		// get comments stored in the state and return each one in a comment component
		return this.state.comments.map( (comment)=> {
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

	_fetchComments() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/comments');
		xhr.send(null);
		xhr.onreadystatechange = () => { 
			if (xhr.readyState === 4) { // readyState 4 means the request is done.
				if (xhr.status === 200) { // status 200 is a successful return.
					// response should look like "{comments:[...]}"
					let response = JSON.parse(xhr.responseText);
					this.setState(response); // this is preserved via arrow function
					console.log(response);
				} else {
					console.log('Error: ' + xhr.status); // An error occurred during the request.
				}
			}
		};
	}

	_postComment(form) {
		let xhr = new XMLHttpRequest();

		// Bind the FormData object and the form element
		let formData = new FormData(form);

		// Set up our request
		xhr.open('POST', '/api/comments');

		// Add the required HTTP header for form data POST requests
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xhr.onreadystatechange = () => { 
			if (xhr.readyState === 4) { // readyState 4 means the request is done.
				if (xhr.status === 200) { // status 200 is a successful return.
					let response = JSON.parse(xhr.responseText);
					console.log(response);
				} else {
					console.log('Error: ' + xhr.status); // An error occurred during the request.
				}
			}
		};

		// The data sent is what the user provided in the form
		xhr.send(formData);
	}

}

class Comment extends React.Component {
	render(){
		return(
			<div className="comment card bg-light mb-3"
				 style={{color:'#111'}}>
				<div className="card-header">
					{this.props.author}
				</div>
				<div className="card-body">
					{this.props.body}
					<hr/>
					<div className="comment-footer">
						<a href="#" className="comment-footer-delete">
							Delete Comment
						</a>
					</div>
				</div>

				
			</div>
		);
	}
}

class CommentForm extends React.Component {
	render(){
		return(
			<div className="card bg-light mb-3" style={{padding: '1em'}}>
				<div className="card-body">
					<h5 className="card-title">{this.props.title}</h5>
					<form 	className="comment-form" 
							onSubmit={this._handleSubmit.bind(this)}
						>
						<div className="form-group">
							<label for="author">
								{this.props.authorLabel}
							</label>
							<input type="text" className="form-control form-control-lg"/>
						</div>

						<div className="form-group">
							<label for="body">
								{this.props.bodyLabel}
							</label>
							<textarea id="body" className="form-control form-control-lg"></textarea>
						</div>

						<button type="submit" className="btn btn-outline-primary btn-lg">
							{this.props.submitButtonText}
						</button>
					</form>
				</div>
			</div>
		);
	}

	_handleSubmit(){

	}
}

ReactDOM.render(
	<CommentBox />, document.getElementById('comment-app')
);

