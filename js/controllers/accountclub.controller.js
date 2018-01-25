angular
.module('app')
.controller('accountClubCtrl', accountClubCtrl)
.controller('ModalInstanceCtrl', ModalInstanceCtrl);

accountClubCtrl.$inject = ['$scope','$modal','$http', '$log'];
function accountClubCtrl($scope, $modal, $http, $log) {
  $scope.clubs = [{
      id: 'club-001',
      name: 'Ararat Fitness Centre',
      image: './img/placeholders/cards/ararat.png',
      logo: './img/placeholders/club-logo/ararat-logo.jpg',
      form: [
              	{
              		"type": "text",
              		"label": "<p>Member Number&nbsp;</p>",
              		"description": "Enter your member number you received on your email",
              		"name": "member-number",
              		"subtype": "text",
              		"className": "red form-control"
              	},
              	{
              		"type": "text",
              		"label": "<p>Participant First Name&nbsp;</p>",
              		"name": "first-name",
              		"subtype": "text",
              		"className": "red form-control"
              	},
              	{
              		"type": "text",
              		"label": "<p>Participant Last Name</p>",
              		"name": "last-name",
              		"subtype": "text",
              		"className": "red form-control"
              	},
                {
                  "type": "file",
                  "label": "<p>File Upload</p>",
                  "placeholder": "test",
                  "className": "slim",
                  "name": "file-1512634001484",
                  "subtype": "file"
                }
              ]
    },
    {
      id: 'club-002',
      name: 'Badminton Victoria',
      image: './img/placeholders/cards/victoria-badminton.png',
      logo: './img/placeholders/club-logo/ararat-logo.jpg'
    }
  ];
  $scope.member = [{
    sportsPassAccountNumber: '123',
    memberNumber : '143',
    clubId : 'club-001',
    firstName : 'Charlon Jeff',
    lastName : 'Cortez',
    barCode : 'AFC-123',
    avatar: './img/placeholders/avatar/avatar.png',
    memberCardData: [
      {"name":"member-number","value":"123"},
      {"name":"first-name","value":"CJ"},
      {"name":"last-name","value":"Cortez"}
    ]
  },
  {
    sportsPassAccountNumber: '163',
    memberNumber : '163',
    clubId : 'club-002',
    firstName : 'Angelo',
    lastName : 'Gabisan',
    barCode : 'AFC-163',
    avatar: './img/placeholders/avatar/avatar.png',
    memberCardData: [
      {"name":"member-number","value":"163"},
      {"name":"first-name","value":"Angelo"},
      {"name":"last-name","value":"Gabisan"}
    ]
  }
  ];
  $scope.card = [{
    memberNumber : '143',
    clubId : 'club-001',
    barCode : 'AFC-123',
    avatar: '',
    activated: 'true'
  },
  {
    memberNumber : '143',
    clubId : 'club-002',
    barCode : 'AFC-123',
    avatar: '',
    activated: 'true'
  }
  ];
  $scope.barCodeOptions = {
      format: 'CODE128',
      lineColor: '#000000',
      width: 2,
      height: 75,
      displayValue: true,
      fontOptions: '',
      font: 'monospace',
      textAlign: 'center',
      textPosition: 'bottom',
      textMargin: 2,
      fontSize: 20,
      background: '#ffffff',
      margin: 0,
      marginTop: undefined,
      marginBottom: undefined,
      marginLeft: undefined,
      marginRight: undefined,
      valid: function (valid) {
      }
  }

  // Function is to get club details from card
  $scope.getClubDetails = function(card) {
        //to prevent errors if $scope.clients is not loaded yet
        if (!$scope.clubs) {
            return;
        }

        for (var c = 0; c < $scope.clubs.length; c++) {
            var club = $scope.clubs[c];
            if (club.id == card.clubId) {
                return club;
            }
        }

    }

  // Set default club in the select element
  $scope.defaultClub = $scope.clubs[-1];


  // Activates if the club is selected
  $scope.selectClub = function() {

        if ($scope.defaultClub){
          $scope.selectedClub = $scope.defaultClub;
          $scope.getClubLayoutTemplate = 'views/common/widgets/get-club-layout.html';
        }else {
          $scope.getClubLayoutTemplate = '';
        }

    }

    $scope.checkMember = function(membClubId) {

      alert("test");
      if (!$scope.member) {
          return;
      }

      for (var c = 0; c < $scope.member.length; c++) {
          var member = $scope.member[c];
          if (member.clubId === membClubId) {
              // return club;
              alert("naa");
          } else {
            alert("wala");
          }
      }

      }

    // Open card modal
    $scope.openCardModal = function(card) {

      console.log();
          //$scope.items = ['item1', 'item2', 'item3'];

          var modalInstance = $modal.open({
              // animation: false,
              // backdrop: 'static',
              templateUrl: 'views/common/widgets/get-card-modal.html',
              controller: 'ModalInstanceCtrl',
              windowClass: 'card-modal fade-scale',

              // size: '100px',
               resolve: {
                  clubValue: function() {
                        if (!$scope.clubs) {
                            return;
                        }

                        for (var c = 0; c < $scope.clubs.length; c++) {
                            var club = $scope.clubs[c];
                            if (club.id == card.clubId) {
                                return club;
                            }
                        }
                  },
                  memberValue: function() {
                    if (!$scope.member) {
                        return;
                    }

                    for (var c = 0; c < $scope.member.length; c++) {
                        var member = $scope.member[c];
                        if (member.memberNumber == card.memberNumber) {
                            return member;
                        }
                    }
                  },
                  cardValue: function () {
                    return card;
                  }
              }
          });
          modalInstance.result.then(function() {
                console.log();
              });
          // uibmodalInstance.result.then(function () {
          //     //products = selectedItems;
          // }, function () {
          //     $log.info('Modal dismissed at: ' + new Date());
          // });
      };


      $scope.slim = {

          // called when slim has initialized
          init: function (data, slim) {
              // slim instance reference
              console.log(slim);

              // current slim data object and slim reference
              console.log(data);
          },

          // called when upload button is pressed or automatically if push is enabled
          service: function (formdata, progress, success, failure, slim) {
              // form data to post to server
              console.log(formdata);

              // call these methods to handle upload state
              console.log(progress, success, failure);

              // reference to Slim instance
              console.log(slim);
          }
      }

}

// Controller for the modal pop up

ModalInstanceCtrl.$inject = ['$scope','$modalInstance','cardValue','clubValue','memberValue'];
function ModalInstanceCtrl($scope,$modalInstance,cardValue,clubValue,memberValue) {

  $scope.card = cardValue;
  $scope.clubs = clubValue;
  $scope.member = memberValue;
  $scope.cardData = [];
  $scope.barCodeOptions = {
      format: 'CODE128',
      lineColor: '#000000',
      width: 2,
      height: 75,
      displayValue: true,
      fontOptions: '',
      font: 'monospace',
      textAlign: 'center',
      textPosition: 'bottom',
      textMargin: 2,
      fontSize: 20,
      background: '#ffffff',
      margin: 0,
      marginTop: undefined,
      marginBottom: undefined,
      marginLeft: undefined,
      marginRight: undefined,
      valid: function (valid) {
      }
  }


    for (var x = 0; x < $scope.member.memberCardData.length; x++) {
          var str = $scope.member.memberCardData[x].name;
          var frags = str.split('-');
          for (var i=0; i<frags.length; i++) {
              frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
          }

          var frags_joined = frags.join(' ');

          // '<p class = "col-lg-6 col-md-6 col-sm-6 col-xs-6">' +frags_joined+ '</p>
          // <p class = "col-lg-6 col-md-6 col-sm-6 col-xs-6">' + card[x].value + '</p>';
          $scope.cardData.push(frags_joined);
          $scope.cardData.push($scope.member.memberCardData[x].value);
      }


console.log($scope.cardData)
  // $scope.getClubDetails = function(card) {
  //       //to prevent errors if $scope.clients is not loaded yet
  //       if (!$scope.clubs) {
  //           return;
  //       }
  //
  //       for (var c = 0; c < $scope.clubs.length; c++) {
  //           var club = $scope.clubs[c];
  //           if (club.id == card.clubId) {
  //               return club;
  //           }
  //       }
  //
  //   }
  //
  // $scope.ok = function () {
  //   window.alert($scope.card);
  //   $uibmodalInstance.close();
  // };
  //
  // $scope.cancel = function () {
  //   $uibmodalInstance.dismiss('cancel');
  // };
}
