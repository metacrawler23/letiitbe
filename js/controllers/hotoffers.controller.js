angular
.module('app')
.controller('hotofferCtrl', hotofferCtrl);

hotofferCtrl.$inject = ['$scope', 'BannerService', 'CategoryService'];
function hotofferCtrl($scope, BannerService, CategoryService) {

    /**
     * Get All Banner Hot offers Type
     * @return Banner Hot Offers Type
     */
    $scope.getHotOffers = function() {
      $scope.banners = [];
      BannerService.getBannerHotOffers().then(function(response){
        $scope.banners = response.data;
        console.log(response);
      });
    };

    /**
     * Get All Banner Hot offers Type Filter by Catetgory
     * @return Banner Hot Offers Type Filter by Catetgory
     */
    $scope.getHotOffersFilter = function (id) {
      $scope.banners = [];
      BannerService.getBannerFilterCategories(id).then(function(response){
        $scope.banners = response.data.banners;
        console.log(response);
      });
    };

    $scope.getCategories = function() {
      CategoryService.getAll().then(function(response){
        $scope.categories = response.data;
        console.log(response);
      });
    };

    $scope.getCategories();
    $scope.getHotOffers();
}
