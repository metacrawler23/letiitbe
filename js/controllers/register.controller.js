﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$rootScope', '$scope', '$http', '$window', 'RegisterService'];
    function RegisterController( $rootScope, $scope, $http, $window, RegisterService) {
        var vm = this;

        vm.register = function () {

      		var data = {
            program_id: 1,
      			user_name : vm.email,
      			password : vm.password,
            email : vm.email,
            first_name : vm.first_name,
            last_name : vm.last_name,
            post_code: vm.post_code
      		};
      		var res = RegisterService.register(data).then(function (response) {
              console.log(response);
          });
      	}
    }

})();
