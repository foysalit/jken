//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/articles', {
                templateUrl: 'views/articles/list.html'
            }).
            when('/articles/create', {
                templateUrl: 'views/articles/create.html'
            }).
            when('/articles/:articleId/edit', {
                templateUrl: 'views/articles/edit.html'
            }).
            when('/articles/:articleId', {
                templateUrl: 'views/articles/view.html'
            }).
            when('/transactions', {
                templateUrl: 'views/transactions/list.html'
            }).
            when('/transactions/create', {
                templateUrl: 'views/transactions/create.html'
            }).
            when('/transactions/:transactionId/edit', {
                templateUrl: 'views/transactions/edit.html'
            }).
            when('/transactions/:transactionId', {
                templateUrl: 'views/transactions/view.html'
            }).
            when('/categories', {
                templateUrl: 'views/categories/list.html'
            }).
            when('/categories/:categoryId/edit', {
                templateUrl: 'views/categories/edit.html'
            }).
            when('/categories/:categoryId', {
                templateUrl: 'views/categories/view.html'
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