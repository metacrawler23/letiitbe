// controller.js
angular
.module('app')
.controller('ScrollCtrl', ScrollCtrl);

ScrollCtrl.$inject = ['$scope'];
function ScrollCtrl($scope, $location, anchorSmoothScroll) {

    $scope.gotoElement = function (eID){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('bottom');

      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);

    };
  };
