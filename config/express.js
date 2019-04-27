var express = require('express');
var bodyParser = require('body-parser');
var controller = require('../app/controllers/rental.server.controller');


module.exports = function(){
	console.log('init express..');
	var app = express();

	app.use(bodyParser.json());

	require('../app/routes/rental.server.routes')(app);
	controller.init();

	// Add socket io
	var server = require('http').Server(app);
	var io = require('socket.io')(server);

	server.listen(8888);

	io.on('connection', function(socket) {
		controller.getRentalInfos(socket);

		socket.on('clientToServerChannel', function(data) {
			// console.log("clientToServerChannel data: " + data);
		});
	});

	app.use(function(req, res, next){
		res.status(404);
		try{
			return res.json('No Found!');
		}
		catch(e){
			console.error('404 set header after send.');
		}
	});

	app.use(function(err, req, res, next){
		if (!err) {
			return next();
		};

		res.status(500);
		try{
			return res.json(err.message || "server err");
		}
		catch(e){
			console.error('500 set header after send.')
		}
	});

	return app;
};