var players = require('../db/db')('player');
var teams = require('../db/db')('teams');

exports.browse = function (req, res) {
	var teamList = teams.browse();

	res.render('player/read', players.search({ 'name': { 'handle': 'faker' } }));
}

exports.read = function (req, res) {
	var playerId = req.params.id;
	var playerFound = players.search({ 'name': { 'handle': playerId } });


	res.render('player/read', playerFound);
}
