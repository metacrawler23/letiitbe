(function () {
  'use strict';

  angular
      .module('app')
      .factory('ContactService', ContactService);

      ContactService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function ContactService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.send = function(data) {
      	 	return $http.post( sportspass.baseUrl + '/enquiry/send-enquiry', data);
      	 }

      	 return service;
      }
  })();
