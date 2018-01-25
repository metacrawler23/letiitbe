// controller.js

angular
.module('app')
.controller('userCtrl', userCtrl);


userCtrl.$inject = ['$scope','$rootScope'];
  function userCtrl($scope, $rootScope) {
      $rootScope.status = 'Logout';
  }
