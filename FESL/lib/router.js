module.exports = function (app, routes, mountPath, excludes) {
	var fs = require('fs');
	app.locals.routes || (app.locals.routes = {});

	var routeList = fs.readdirSync(routes);
	var routeSet = [];
	var index = null;

	routeList.forEach(function (file) {

		var route = require('../' + routes + '/' + file);
		var routeName = file.replace('.js', '');
		var routePath = '/' + ((mountPath) ? mountPath + '/' : '') + routeName;
		routeSet.push(routeName);

		if (routeName.toUpperCase() == 'INDEX')
			index = route;

		Object.keys(route).forEach(function (method) {
			switch (method.toUpperCase()) {
				case 'BROWSE':
					app.get(routePath, route[method]);
					break;
				case 'READ':
					app.get(routePath + '/:id', route[method]);
					break;
				case 'EDIT':
					app.post(routePath + '/:id/edit', route[method]);
					break;
				case 'ADD':
					app.post(routePath + '/new', route[method]);
					break;
				case 'DELETE':
					app.post(routePath + '/:id/delete', route[method]);
					break;
				default:
					app[method](routePath, route[method]);
			}
		});

	});

	routeSet = routeSet.filter(function (route) { return !(new RegExp('(' + excludes.join(')|(', 'i') + ')').test(route)); });

	app.locals.routes[mountPath || 'main'] = routeSet;

	app.get('/' + mountPath, index['get']);
};