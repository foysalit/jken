//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/finance/profit-loss', {
                templateUrl: 'views/finance/index.html'
            }).
            when('/finance/transactions', {
                templateUrl: 'views/finance/transactions/index.html'
            }).
            when('/finance/transactions/:transactionId/edit', {
                templateUrl: 'views/finance/transactions/edit.html'
            }).
            when('/finance/transactions/:transactionId', {
                templateUrl: 'views/finance/transactions/view.html'
            }).
            when('/settings/categories', {
                templateUrl: 'views/settings/categories/list.html'
            }).
            when('/settings/categories/:categoryId/edit', {
                templateUrl: 'views/settings/categories/edit.html'
            }).
            when('/settings/classes', {
                templateUrl: 'views/settings/classes/list.html'
            }).
            when('/settings/tools', {
                templateUrl: 'views/settings/tools/index.html'
            }).
            when('/', {
                templateUrl: 'views/index.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);