angular
.module('app')
.controller('accountClubCtrl', accountClubCtrl);

accountClubCtrl.$inject = ['$scope'];
function accountClubCtrl($scope) {
  $scope.clubs = [{
      id: '1',
      name: 'Ararat Fitness Centre',
      image: './img/placeholders/cards/ararat.png'
    },
    {
      id: '2',
      name: 'Badminton Victoria',
      image: './img/placeholders/cards/victoria-badminton.png'
    }
  ];



}
