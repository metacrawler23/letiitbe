angular
.module('app')
.controller('homeBoxesCtrl', homeBoxesCtrl);

homeBoxesCtrl.$inject = ['$scope'];
function homeBoxesCtrl($scope) {
   $scope.trendingOffers = [
     './img/placeholders/home-boxes/macas.png',
     './img/placeholders/home-boxes/macas2.png',
     './img/placeholders/home-boxes/macas3.png',
     './img/placeholders/home-boxes/macas4.png',
     './img/placeholders/home-boxes/macas5.png',
     './img/placeholders/home-boxes/macas6.png',
     './img/placeholders/home-boxes/macas7.png',
     './img/placeholders/home-boxes/macas8.png',
    ];

    $scope.trendingExperiences = [
      './img/placeholders/home-boxes/macas.png',
      './img/placeholders/home-boxes/macas2.png',
      './img/placeholders/home-boxes/macas3.png',
      './img/placeholders/home-boxes/macas4.png',
      './img/placeholders/home-boxes/macas5.png',
      './img/placeholders/home-boxes/macas6.png',
      './img/placeholders/home-boxes/macas7.png',
      './img/placeholders/home-boxes/macas8.png',
     ];

}
