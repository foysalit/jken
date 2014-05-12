//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/finance/profit-loss/', {
                templateUrl: 'views/finance/index.html'
            }).
            when('/finance/profit-loss/create', {
                templateUrl: 'views/finance/create.html'
            }).
            when('/finance/profit-loss/:transactionId/edit', {
                templateUrl: 'views/finance/edit.html'
            }).
            when('/finance/profit-loss/:transactionId', {
                templateUrl: 'views/finance/view.html'
            }).
            when('/settings/categories', {
                templateUrl: 'views/settings/categories/list.html'
            }).
            when('/settings/classes', {
                templateUrl: 'views/settings/classes/list.html'
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