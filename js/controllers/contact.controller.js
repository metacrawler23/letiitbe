angular
.module('app')
.controller('contactCtrl', contactCtrl)

// Controller for the modal pop up

contactCtrl.$inject = ['$scope', 'ContactService'];
function contactCtrl($scope, ContactService) {

  $scope.sendEnquiry = function() {

    var data = {
      name : $scope.contact.first_name + ' ' + $scope.contact.last_name,
      subject: $scope.contact.enquiry,
      email: $scope.contact.email,
      body: $scope.contact.message,
      type: $scope.contact.type
    };
    
    ContactService.send(data).then(function(response){
      console.log(response);
    });
  }
}
