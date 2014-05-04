angular.module('mean.system').controller('IndexController', [
	'$scope', 'Global', 'Klasses',
	function ($scope, Global, Klasses) {
    $scope.global = Global;

    $scope.kPerPage = 2;
    $scope.kCurPage = 1;
    $scope.klasses = [];
    $scope.getKlasses = function () {
    	Klasses.query({
    		limit: $scope.kPerPage,
    		withTransactions: true,
    		offset: ($scope.kCurPage * $scope.kPerPage) - $scope.kPerPage
    	}, function (klasses) {
    		$scope.klasses = $scope.klasses.concat(klasses);
    		++$scope.kCurPage;

    		if(klasses.length < $scope.kPerPage)
    			$scope.klassesEnded = true;
    	})
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