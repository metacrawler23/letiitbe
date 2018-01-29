angular
.module('app')
.controller('homeBoxesCtrl', homeBoxesCtrl);

homeBoxesCtrl.$inject = ['$scope','BannerService'];
function homeBoxesCtrl($scope,BannerService) {


     $scope.getBanner = function() {

         BannerService.getBannerDefault().then(function(response){
          $scope.defBanners = response.data;

          console.log($scope.defBanners);
         });


         BannerService.getBannerTrendingOffers().then(function(response){
          $scope.trendingOffers = response.data;

          console.log($scope.trendingOffers);
         });

         BannerService.getBannerTrendingExperience().then(function(response){
          $scope.trendingExperiences = response.data;

          console.log($scope.trendingExperiences);
         });


     }

     $scope.getBanner();


}
