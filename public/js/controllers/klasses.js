angular.module('mean.klasses').controller('KlassesController', [
    '$scope', '$routeParams', '$location', 'Global', 'Klasses',
    function ($scope, $routeParams, $location, Global, Klasses) {
    $scope.global = Global;

    $scope.create = function() {
        var klass = new Klasses({
            name: this.name
        });

        klass.$save(function(response) {
            $scope.klasses.push(response);
        });

        this.name = "";
    };

    $scope.remove = function(klass) {
        if (klass) {
            klass.$remove();  

            for (var i in $scope.klasses) {
                if ($scope.klasses[i] == klass) {
                    $scope.klasses.splice(i, 1);
                }
            }
        }
        else {
            $scope.klass.$remove();
            $location.path('klasses');
        }
    };

    $scope.update = function() {
        var klass = $scope.klass;
        if (!klass.updated) {
            klass.updated = [];
        }
        klass.updated.push(new Date().getTime());

        klass.$update(function() {
            $location.path('klasses/' + klass.id);
        });
    };

    $scope.find = function(withCat) {
        var query = {};

        if(withCat) query.withCategories = true;

        Klasses.query(query, function(klasses) {
            $scope.klasses = klasses;
        });
    };

    $scope.findOne = function() {
        Klasses.get({
            klassId: $routeParams.klassId
        }, function(klass) {
            $scope.klass = klass;
        });
    };

    $scope.klassSelected = function (klass) {
        return parseInt($scope.createFormData.KlassId) === klass.id;
    };
}]);