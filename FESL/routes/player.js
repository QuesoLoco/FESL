﻿var db = require('../db/db')('player');

exports.browse = function (req, res) {
	res.render('player', db.read('Faker'));
}

exports.read = function (req, res) {
	var playerId = req.params.id;
	res.render('player', db.read(playerId));
}