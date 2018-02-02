angular
.module('app')
.controller('accountCtrl', accountCtrl)

// Controller for the modal pop up
accountCtrl.$inject = ['$scope', 'AccountService', 'ClubsService'];
function accountCtrl($scope, AccountService, ClubsService) {
  $scope.user  = JSON.parse(localStorage.getItem('user'));

  $scope.getUser = function() {

    AccountService.getOne($scope.user.data.id).then(function(response){
     $scope.userData = response.data;
    });
  }

  $scope.getCards = function() {

    $scope.myCards = [];

    AccountService.getAccountCards($scope.user.data.id).then(function(response){
      $scope.club      = [];
      $scope.userCards = response.data.cards;
      angular.forEach($scope.userCards, function(value, key) {

        ClubsService.getOne(value.club_id).then(function(response){
           $scope.club.push(response.data);
        });

        $scope.myCards.push({
          cards: value,
          club: $scope.club
        });
      });

      // @todo please display this data.
      console.log($scope.myCards);
    });
  }

  $scope.getSate = [
    'VIC',
    'NSW',
    'QLD',
    'ACT',
    'SA',
    'WA',
    'TAS'
  ];

  $scope.getUser();
  $scope.getCards();
}
