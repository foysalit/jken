angular.module('mean.system').controller('profitLossController', [
    '$scope', 'Global', 'Klasses', 'Transactions',
    function ($scope, Global, Klasses, Transactions) {
    $scope.global = Global;

    $scope.filters = {
        withTransactions: true,
        fromDate: moment().subtract('days', 30).format(),
        toDate: moment().format()
    };

    $scope.getKlasses = function () {
        Klasses.query($scope.filters, function (klasses) {
            $scope.klasses = klasses;
        });
    };

    $scope.getTransactionsTotal = function (transactions, catId) {
        var total = 0.00;

        if(transactions != 'undefined' && transactions.length > 0){
            angular.forEach(transactions, function (t) {
                if(catId && catId > 0){
                    if(catId == t.CategoryId) total += t.amount;
                }else{
                    total += t.amount;
                }
            }); 
        }

        return total.toFixed(2);
    };

    $scope.filterTransactionsByCat = function (transactions, catId) {
        var items = [];

        angular.forEach(transactions, function (t) {
            if(t.CategoryId == catId)
                items.push(t);
        });

        return items;
    };

    $scope.openTray = function (item) {
        item.open=true; 
    };
    $scope.closeTray = function (item) {
        item.open=false;    
    };
}]);