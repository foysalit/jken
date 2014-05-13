angular.module('mean.settings').factory("Settings", ['$http', function($http) {
    return {
    	dbBackUp: function () {
    		return $http.post('/settings/database_backups');
    	},

    	getDbBackUps: function () {
    		return $http.get('/settings/database_backups');
    	},

    	removeDbBackUp: function (backUp) {
    		return $http.post('/settings/database_backups/remove', {
    			file: backUp.file
    		});
    	}
    };
}]);