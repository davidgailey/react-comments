var express = require('express'),
	morgan = require('morgan'),
	app = express();

app.set('port', (process.env.PORT || 5000));

// use morgan for logging
app.use(morgan('dev'));

// serve static content, express will use index.html for the "/" route
app.use(express.static(__dirname + '/public'));

// comment CRUD api
	// Create comments
	app.put('/api/comments', function(request, response) {
		
	});

	// Read comments
	app.get('/api/comments', function(request, response) {
		var commentList = [
			{id:1, author: 'Jerry', body: 'I like cheese'},
			{id:2, author: 'Tom', body: 'I like mice!'}
		]; // to do: query mongoDB database

		sendSuccessResponse(response,commentList);
	});

	// Update comments
	app.post('/api/comments', function(request, response) {
		
	});

	// Delete comments
	app.delete('/api/comments', function(request, response) {
		
	});

function sendSuccessResponse(response,obj){
	if(arguments.length !== 2){
		console.error('sendSuccessResponse needs 2 arguments');
		throw new Error();
	}

	response.setHeader('Content-Type','application/json');
	response.status(200)
		.send(JSON.stringify(obj))
		.end();
}

app.listen(app.get('port'), function() {
	console.log('Node app is running on port ', app.get('port'));
});


