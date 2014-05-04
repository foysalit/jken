//Klasses service used for klasses REST endpoint
angular.module('mean.klasses').factory("Klasses", ['$resource', function($resource) {
    return $resource('klasses/:klassId', {
        klassId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);