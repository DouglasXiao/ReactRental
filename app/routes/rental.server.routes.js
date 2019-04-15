var RentalController = require('../controllers/rental.server.controller');

module.exports = function(app){
	app.route('/api/getUsername').get((req, res) => res.send({ username: 'serverName' }));

	app.route('/rental/getInfos').all(RentalController.getRentalInfos);
}