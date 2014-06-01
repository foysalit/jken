angular.module('mean.system').controller('forecastsController', [
    '$scope', 'Global', 'Api',
    function ($scope, Global, Api) {
    $scope.global = Global;

    $scope.transactionFilters = {
        fromDate: moment().subtract('years', 2).format(),
        toDate: moment().format()
    };

    $scope.getForecasts = function () {
        Api.getForecasts($scope.transactionFilters).success(function (transactions) {
            $scope.transactions = transactions; 
        });
    };
}]);