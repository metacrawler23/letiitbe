
(function () {
  'use strict';

  angular
      .module('app')
      .factory('AccountService', AccountService);

      AccountService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function AccountService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/account/get-accounts');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/account/' + id);
         },

         service.getAccountMembers = function(id) {
           return $http.get( sportspass.baseUrl + '/account/account-members/' + id);
         }

         service.getAccountCards = function($id) {
           return $http.get( sportspass.baseUrl + '/account/account-cards/' + id);
         }

      	 return service;
      }
  })();
