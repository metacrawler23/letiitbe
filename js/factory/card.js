(function () {
  'use strict';

  angular
      .module('app')
      .factory('CardService', CardService);

      CardService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function CardService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.createCard = function(data) {
           return $http.post(sportspass.baseUrl + '/card/create-card', data);
         }

      	 return service;
      }
  })();
