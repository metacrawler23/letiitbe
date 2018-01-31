angular
.module('app')
.controller('accountCtrl', accountCtrl)

// Controller for the modal pop up

accountCtrl.$inject = ['$scope','AccountService'];
function accountCtrl($scope,AccountService) {
  $scope.user  = JSON.parse(localStorage.getItem('user'));

console.log ($scope.user)
  $scope.getUser = function() {

    AccountService.getOne($scope.user.data.id).then(function(response){
     $scope.userData = response.data;

     console.log(response.data);
    });
  }
  $scope.getUser();

    $scope.getSate = [
      'VIC',
      'NSW',
      'QLD',
      'ACT',
      'SA',
      'WA',
      'TAS'
    ];

}
