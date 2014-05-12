angular.module('mean.system').controller('profitLossController', [
    '$scope', 'Global', 'Klasses', 'Transactions',
    function ($scope, Global, Klasses, Transactions) {
    $scope.global = Global;

    $scope.transactionFilters = {
        fromDate: moment().subtract('months', 6).format(),
        toDate: moment().format()
    };

    $scope.getKlasses = function () {
        Klasses.query({withCategories: true}, function (klasses) {
            $scope.klasses = klasses;
        });
    };

    $scope.getTransactions = function () {
        Transactions.query($scope.transactionFilters, function (transactions) {
            $scope.transactions = transactions; 
        });
    };

    $scope.getTransactionsByCategory = function (catId, count) {
        var count = count || false,
            trans = getTransactionsByProp('category', catId);

        if(!count) return trans;

        return trans.length;
    };

    $scope.getTransactionsByKlass = function (klassId, count) {
        var count = count || false,
            trans = getTransactionsByProp('klass', klassId);

        if(!count) return trans;

        return trans.length;
    };

    var getTransactionsByProp = function (name, value) {
        var params = {};

        switch(name){
            case 'category':
                params['CategoryId'] = value;
                break;
            case 'klass':
                params['KlassId'] = value;
                break;
            default:
                break;
        }

        var trans = _.filter($scope.transactions, params);

        if(typeof trans === 'undefined') return [];
        return trans;
    };

    $scope.getTransactionsTotal = function (transactions, catId) {
        var total = 0.00;

        if(typeof transactions != 'undefined' && transactions.length > 0){
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

    $scope.getKlassAmount = function (klassId) {
        var trans = getTransactionsByProp('klass', klassId),
            total = 0.00;

        _.each(trans, function (t) {
            total += t.amount;
        });

        return total.toFixed(2);
    };

    $scope.getCategoryAmount = function (categoryId) {
        var trans = getTransactionsByProp('category', categoryId),
            total = 0.00;

        _.each(trans, function (t) {
            total += t.amount;
        });

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