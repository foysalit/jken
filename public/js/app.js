angular.module('mean', [
	'ngCookies', 
	'ngResource', 
	'ngRoute', 
	'ui.bootstrap', 
	'ui.route', 
	'mean.system',
	'mean.transactions',
	'mean.klasses', 
	'mean.categories', 
	'mean.settings', 
	'mean.articles'
]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.klasses', []);
angular.module('mean.categories', []);
angular.module('mean.transactions', []);
angular.module('mean.settings', []);