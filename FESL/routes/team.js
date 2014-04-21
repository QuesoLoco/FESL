var db = require('../db/db')('team');

exports.get = function (req, res) {
	res.render('team', db.read(0));
}