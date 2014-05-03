angular.module('mean', [
	'ngCookies', 
	'ngResource', 
	'ngRoute', 
	'ui.bootstrap', 
	'ui.route', 
	'mean.system',
	'mean.transactions',
	'mean.categories', 
	'mean.articles'
]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.categories', []);
angular.module('mean.transactions', []);