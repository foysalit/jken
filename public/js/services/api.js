angular.module('mean').factory("Api", ['$http', function($http) {
    return {
        getTransactionsByCategory: function (total, from) {
            return $http.get('/transactions/'+ total + '/from/'+ from);
        }
    }
}]);