angular
.module('app')
.controller('hotofferCtrl', hotofferCtrl);

hotofferCtrl.$inject = ['$scope', 'BannerService', 'CategoryService'];
function hotofferCtrl($scope, BannerService, CategoryService) {

    /**
     * @return Banner Hot Offers Type
     */
    $scope.getHotOffers = function() {

      BannerService.getBannerHotOffers().then(function(response){
        $scope.banners = response.data;
        console.log(response);
      });
    };

    $scope.getCategories = function() {

      CategoryService.getAll().then(function(response){

        $scope.categories = response.data;
        console.log(response);
      });
    };

    $scope.getTiles = function (id) {
      $scope.banners = [];

      BannerService.getBannerFilterCategories(id).then(function(response){
        $scope.banners = response.data.banners;
        console.log(response);
      });
    };

    $scope.getCategories();
    $scope.getHotOffers();
}
