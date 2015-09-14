'use strict';

const express = require('express');
const config = require('./config/index.js');
const app = express();
const handlebars = require('express-handlebars');

app.engine('.hbs', handlebars());

app.set('view engine', '.hbs');

app.route('/sites/numbers/:area')
	.get(function(req, res) {
		let area = req.params.area.toLowerCase();
		console.log('c', config.get(area) );
		if(config.has(area)){
			res.render( 'main', config.get(area) );
		}else{
			res.send('nope');
		}
	});

app.get('/', function (req, res) {
	res.send('Hello World!!');
});

var server = app.listen(3000, function () {
	let host = server.address().address;
	let port = server.address().port;

	console.log( 'Example app listening at http://', server.address() );
});
