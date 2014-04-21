collections = require('./collections.json');


module.exports = function (collection) {
	return {
		read: function (id) {
			if (collection.toUpperCase() == 'PLAYER') {
				var playerFound;
				collections.player.forEach(function (playerId) {
					if (playerId.name.handle.toUpperCase() == id.toUpperCase())
						playerFound = playerId;
				});
			}
				return playerFound || collections[collection][id];
		}
	}
}