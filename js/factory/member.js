
(function () {
  'use strict';

  angular
      .module('app')
      .factory('MemberService', MemberService);

      MemberService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function MemberService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/member/get-members');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/member/' + id);
         },

         service.checkMemberNumber = function(member, club) {
           return $http.get( sportspass.baseUrl + '/member/check-member-number/' + member + '/' + club);
         };

      	 return service;
      }
  })();
