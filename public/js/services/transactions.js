//Transactions service used for transactions REST endpoint
angular.module('mean.transactions').factory("Transactions", ['$resource', function($resource) {
    return $resource('transactions/:transactionId', {
        transactionId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);