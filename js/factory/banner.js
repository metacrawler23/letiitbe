(function () {
  'use strict';

  angular
      .module('app')
      .factory('BannerService', BannerService);

      BannerService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function BannerService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/banner/get-banners');
      	 },
         service.getBannerCategories = function(id) {
          return $http.get( sportspass.baseUrl + '/banner/get-banner-categories/' + id);
         }

         service.getBannerRetailer = function(id) {
          return $http.get( sportspass.baseUrl + '/banner/get-banner-retailer/' + id);
         }

         service.getBannerFilter = function() {
          return $http.get(sportspass.baseUrl + '/banner/get-banner-filter');
         }

         service.getBannerDefault = function () {
           return $http.get(sportspass.baseUrl + '/banner/banner-default');
         }

         service.getBannerTrendingOffers = function () {
           return $http.get(sportspass.baseUrl + '/banner/banner-trending-offers');
         }

         service.getBannerTrendingExperience = function () {
           return $http.get(sportspass.baseUrl + '/banner/banner-trending-experience');
         }

      	 return service;
      }
  })();
