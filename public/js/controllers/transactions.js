angular.module('mean.transactions').controller('TransactionsController', 
    ['$scope', '$routeParams', '$location', 'Global', 'Transactions', 'Api',
    function ($scope, $routeParams, $location, Global, Transactions, Api) {
    $scope.global = Global;

    $scope.createFormData = {};
    $scope.create = function() {
        //the date needs to be parsed as a valid date format
        var date = moment(this.createFormData.date, "DD/MM/YYYY");
        this.createFormData.date = date.toDate();
        
        var transaction = new Transactions(this.createFormData);
        
        transaction.$save(function(response) {
            $scope.find();
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

    $scope.currentPage = 1;
    $scope.filters = {perPage: 10};

    $scope.find = function() {
        $scope.filters.offset = ($scope.currentPage - 1) * $scope.filters.perPage;

        Api.getTransactions($scope.filters).success(function(transactions) {
            $scope.transactions = transactions;
        });

        $scope.getTotaTransactions();
    };

    $scope.getTotaTransactions = function () {
        Api.countTransactions($scope.filters).success(function (data) {
            if(data){
                $scope.totalTransactions = data;
            }
        });
    };

    $scope.paginate = function (page) {
        $scope.currentPage = page;
        $scope.find();
    };

    $scope.findOne = function() {
        Transactions.get({
            transactionId: $routeParams.transactionId
        }, function(transaction) {
            $scope.transaction = transaction;
        });
    };
}]);