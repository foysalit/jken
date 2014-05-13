angular.module('mean.transactions').controller('TransactionsController', ['$scope', '$routeParams', '$location', 'Global', 'Transactions', function ($scope, $routeParams, $location, Global, Transactions) {
    $scope.global = Global;

    $scope.createFormData = {};
    $scope.create = function() {
        //the date needs to be parsed as a valid date format
        var date = moment(this.createFormData.date, "DD/MM/YYYY");
        this.createFormData.date = date.toDate();
        
        var transaction = new Transactions(this.createFormData);
        
        transaction.$save(function(response) {
            $location.path("finance/profit-loss");
        });
        
        $scope.createFormData = {};
    };

    $scope.remove = function(transaction) {
        if (transaction) {
            transaction.$remove();  

            for (var i in $scope.transactions) {
                if ($scope.transactions[i] == transaction) {
                    $scope.transactions.splice(i, 1);
                }
            }
        }
        else {
            $scope.transaction.$remove();
            $location.path('transactions');
        }
    };

    $scope.update = function() {
        var transaction = $scope.transaction;

        transaction.$update(function() {
            $location.path('transactions');
        });
    };

    $scope.find = function() {
        Transactions.query($scope.pagination, function(transactions) {
            $scope.transactions = transactions;
        });
    };

    $scope.findOne = function() {
        Transactions.get({
            transactionId: $routeParams.transactionId
        }, function(transaction) {
            $scope.transaction = transaction;
        });
    };
}]);