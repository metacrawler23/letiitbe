angular
.module('app')
.controller('sportsClubController', sportsClubController)


sportsClubController.$inject = ['$scope','ClubsService','BannerService','$state', '$stateParams'];
function sportsClubController($scope,ClubsService,BannerService,$state, $stateParams) {

  $scope.getclubPage = function() {

          ClubsService.clubPage($state.params.slug).then(function(response){


           $scope.pageDetails = response.data.club;

           // console.log($scope.pageDetails);

          $scope.customBanners = response.data.banners;

           console.log($scope.customBanners);

          });
   }

   $scope.getBanner = function() {

     BannerService.getBannerDefault().then(function(response){
      $scope.defaultBanners = response.data;

      console.log($scope.defaultBanners);
     });
   }
    $scope.getclubPage();
    $scope.getBanner();

   //
   // if ($scope.customBanners) {
   //   $scope.clubBanners = $scope.customBanners;
   // } else {
   //   $scope.clubBanners = $scope.defaultBanners;
   // }


}
