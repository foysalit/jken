//Categories service used for categories REST endpoint
angular.module('mean.categories').factory("Categories", ['$resource', function($resource) {
    return $resource('categories/:categoryId', {
        categoryId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);