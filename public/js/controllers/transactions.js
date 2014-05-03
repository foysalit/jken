angular.module('mean.transactions').controller('TransactionsController', ['$scope', '$routeParams', '$location', 'Global', 'Transactions', function ($scope, $routeParams, $location, Global, Transactions) {
    $scope.global = Global;

    $scope.createFormData = {};
    $scope.create = function() {
        var transaction = new Transactions(this.createFormData);
        
        transaction.$save(function(response) {
            $location.path("transactions/" + response.id);
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
        if (!transaction.updated) {
            transaction.updated = [];
        }
        transaction.updated.push(new Date().getTime());

        transaction.$update(function() {
            $location.path('transactions/' + transaction.id);
        });
    };

    $scope.find = function() {
        Transactions.query(function(transactions) {
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