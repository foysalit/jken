angular.module('mean.system').factory("Api", ['$http', function($http) {
	var buildParams = function (filters) {
		var params = '',
			counter = 0;

		_.forIn(filters, function (val, name) {
			if(counter === 0)
				params += name +'='+ val;
			else
				params += '&'+ name +'='+ val;

			++counter;
		});

		return params;
	};

    return {
        getForecasts: function (filters) {
        	var url = '/transactions/forecasts?'+ buildParams(filters);
        	
            return $http.get(url);
        },

        getTransactions: function (filters) {
        	var url = '/transactions?'+ buildParams(filters);
        	
            return $http.get(url);
        },

        countTransactions: function (filters) {
        	var url = '/transactions/count?'+ buildParams(filters);
        	
            return $http.get(url);
        }
    }
}]);