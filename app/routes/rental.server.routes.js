
const queryLines = require('../models/rental.server.model').queryLines;

// Init socket.io with DB instance
function initSocketIO(instance, app) {
	var server = require('http').Server(app);
	var io = require('socket.io')(server);

	server.listen(8888);

	io.on('connection', function(socket) {

		socket.on('clientToServerChannel', function(data) {
			console.log("Got the client data, lat: " + data.lat + " lng: " + data.lng);

			queryLines(instance, socket);
		});
	});
}

module.exports = {
	initSocketIO,
};