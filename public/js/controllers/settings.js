angular.module('mean.settings').controller('SettingsController', ['$scope', '$routeParams', '$location', 'Global', 'Settings', function ($scope, $routeParams, $location, Global, Settings) {
    $scope.global = Global;

    $scope.dbBackUp = function () {
        Settings.dbBackUp().success(function (res) {
            if(res.done) $scope.getDbBackUps();
        });
    };

    $scope.getDbBackUps = function () {
        Settings.getDbBackUps().success(function (backUps) {
            $scope.backUps =  backUps;
        });
    };

    $scope.removeDbBackUp = function (backUp) {
        Settings.removeDbBackUp(backUp).success(function (res) {
            if(res.done) $scope.getDbBackUps();
        });
    };
}]);