angular
.module('app')
.controller('ambassadorCarouselCtrl', ambassadorCarouselCtrl)
.controller('bannerAdsCarouselCtrl', bannerAdsCarouselCtrl)
.controller('liMarqueeCtrl', liMarqueeCtrl);

ambassadorCarouselCtrl.$inject = ['$scope'];
function ambassadorCarouselCtrl($scope) {
  $scope.ambassadorImages = [
     './img/sports/ambassadors/SportsPass-Ambassador-Nicholas-Good.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Miao-Miao.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Glenn-Turner.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Danielle-Davis.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Ashleigh-Brennan.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Bianca-Chatfield.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Colin-Scotts.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Danielle-Scott.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Jason-Johnson.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Lauryn-Mark.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Mattew-White.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Nicole-Livingstone-1.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Russell-Mark-1.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-Simon-Goodwin.jpg',
     './img/sports/ambassadors/SportsPass-Ambassador-William-Henzell.jpg'
   ];
}


bannerAdsCarouselCtrl.$inject = ['$scope'];
function bannerAdsCarouselCtrl($scope) {
  $scope.bannerAdsImages = [
     './img/placeholders/banner-ads/3000-experiences.jpeg',
     './img/placeholders/banner-ads/dreamworld.jpg',
     './img/placeholders/banner-ads/megaparks.jpg',
   ];
}

liMarqueeCtrl.$inject = ['$scope','ClubsService'];
function liMarqueeCtrl($scope,ClubsService) {

  $scope.clubLogos = [];
    //
    $scope.getClubs = function() {

      ClubsService.getAll().then(function(response){

        angular.forEach(response.data.clubs, function(value, key) {
          $scope.clubLogos.push({link: value.link, logo: value.logo});
        });

      });
    }

    $scope.getClubs();

    // $scope.clubLogos = [
    //    './img/placeholders/club-logo/sample-clublogo.jpg',
    //    './img/placeholders/club-logo/sample-clublogo2.jpg',
    //    './img/placeholders/club-logo/sample-clublogo3.jpg',
    //    './img/placeholders/club-logo/sample-clublogo4.jpg',
    //    './img/placeholders/club-logo/sample-clublogo5.jpg',
    //    './img/placeholders/club-logo/sample-clublogo6.jpg',
    //    './img/placeholders/club-logo/sample-clublogo7.jpg',
    //    './img/placeholders/club-logo/sample-clublogo8.jpg'
    //   ];


}
