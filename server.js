var express = require('express'),
	morgan = require('morgan'),
	async = require('async')''
	app = express();

app.set('port', (process.env.PORT || 5000));

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index');
});

app.get('/api/comments', function(request, response) {
	var commentList = [
		{id:1, author: 'Jerry', body: 'I like cheese'},
		{id:2, author: 'Tom', body: 'I like mice!'}
	]; 
	response.send(commentList);
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


