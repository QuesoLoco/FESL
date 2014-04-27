var mongo = require('mongodb');


module.exports = function (collection) {
	return {
		read: function (id) {
			return collections[collection][id];
		},

		search: function (limiters) {
			
			return findMatchesInCollection(collections[collection], limiters);
		},

		browse: function (limiter) {
			return collection[collection];
		}
	}
}


function findMatchesInCollection(collection, filterObj) {
	return collection.filter(function (item) {
		return Object.keys(filterObj).every(function (property) {
			var itemProperty = item[property];

			if ((typeof filterObj[property]).toUpperCase() == "OBJECT") {
				if (Array.isArray(filterObj[property]))
					filterObj[property] = '(' + filterObj[property].join('|') + ')';
				else {
					if (itemProperty)
																																 
				}
					findMatchesInCollection(collection, filterObj[property]);
			}
			else
				return (new RegExp(filterObj[property], 'gim').test(item[property]));
		});

	})
}
