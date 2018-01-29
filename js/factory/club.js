(function () {
  'use strict';

  angular
      .module('app')
      .factory('ClubsService', ClubsService);

      ClubsService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function ClubsService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/club/get-clubs');
      	 }

         service.clubPage = function(slug) {
           return $http.get( sportspass.baseUrl + '/club/club-page/' + slug);
        }

      	 return service;
      }
  })();
