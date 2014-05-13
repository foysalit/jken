angular.module('mean.categories').controller('CategoriesController', [
    '$scope', '$routeParams', '$location', 'Global', 'Categories', 'Transactions', 
    function ($scope, $routeParams, $location, Global, Categories, Transactions) {
    $scope.global = Global;

    $scope.createFormData = {};
    $scope.create = function() {
        var category = new Categories(this.createFormData);

        category.$save(function(response) {
            $scope.categories.push(response);
        });

        $scope.createFormData = {};
    };

    $scope.remove = function(category) {
        if (category) {
            category.$remove();  

            for (var i in $scope.categories) {
                if ($scope.categories[i] == category) {
                    $scope.categories.splice(i, 1);
                }
            }
        }
        else {
            $scope.category.$remove();
        }
    };

    $scope.update = function() {
        var category = $scope.category;
        if (!category.updated) {
            category.updated = [];
        }
        category.updated.push(new Date().getTime());
        
        category.$update(function() {
            $location.path('settings/categories');
        });
    };

    $scope.find = function() {
        Categories.query(function(categories) {
            $scope.categories = categories;
        });
    };

    $scope.findOne = function() {
        Categories.get({
            categoryId: $routeParams.categoryId
        }, function(category) {
            $scope.category = category;
        });
    };
}]);