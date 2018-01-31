(function () {
  'use strict';

  angular
      .module('app')
      .factory('CategoryService', CategoryService);

      CategoryService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function CategoryService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/category');
      	 }

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/category/' + id);
         }

      	 return service;
      }
  })();
