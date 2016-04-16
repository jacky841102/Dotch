var express = require('express'), 
	handlebars = require('express3-handlebars').create({defaultLayout:'layout/main'});
	//main.handlebars or main.hbs
var fortune = require('../lib/fortune.js'),
	credentials = require('./credentials.js');
var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// can override port setting before server starts
app.set('port', process.env.PORT || 3000); 

// static resourses, e.g. CSS, Js, images..., served without handling
app.use(express.static(__dirname + '/public'));
app.use(require('cookie-parser')(credentials.cookieCred));

app.get('/', function(req, res){
	// res.type('text/plain');
	// res.send('Meadowlark Travel');
	res.render('home');
});

app.get('/about', function(req, res){ // filters querystring
	// res.type('text/plain');
	// res.send('About meadowlark travel');
	res.render('about', {fortune: fortune.getFortune()});
});

app.use(function(req, res){ // use: middleware -- catch-all handler (provide modulization)
	res.type('text/plain');
	res.status(404);
	// res.send('404 - Not Found');
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	// res.send('500 - Server Error');
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on localhost:' + 
		app.get('port') + '; press ctrl+c to terminate.');
});
