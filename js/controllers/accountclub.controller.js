angular
.module('app')
.controller('accountClubCtrl', accountClubCtrl)
.controller('ModalInstanceCtrl', ModalInstanceCtrl);

accountClubCtrl.$inject = ['$compile','$scope','$modal','$http', '$log', 'ClubsService', 'MemberService','AccountService', 'CardService', 'MemberService', 'aws'];
function accountClubCtrl($compile,$scope, $modal, $http, $log , ClubsService, MemberService, AccountService, CardService, MemberService, aws) {
  // ##### PRACTICE INDENTATTION!! ######### //
  var vm = this;

  $scope.clubs  = [];
  $scope.member = [];

  $scope.user  = JSON.parse(localStorage.getItem('user'));

  $scope.getClubs = function() {

    ClubsService.getAll().then(function(response){
     $scope.clubs = response.data.clubs;

     console.log($scope.clubs);
    });
  }

  // $scope.getMembers = function(member, club) {
  //
  //   MemberService.checkMemberNumber(member, club).then(function(response){
  //     // $scope.member = response.data.member;
  //     //
  //     // console.log($scope.member);
  //     return response.data.member;
  //
  //   });
  //
  //   // AccountService.getAccountMembers($scope.user.data.id).then(function(response){
  //   //  $scope.member = response.data;
  //   //
  //   //  console.log($scope.member);
  //   // });
  // }

  // $scope.getCards = function() {
  //
  //   AccountService.getAccountMembers($scope.user.data.id).then(function(response){
  //    $scope.member = response.data;
  //
  //    $scope.selectedClub = $scope.member;
  //    $scope.getClubLayoutTemplate = 'views/common/widgets/get-club-layout.html';
  //
  //   });
  // }

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

  /**
   * @todo get selected club data
   * @todo get user id
   * @todo set card avatar
   */
  $scope.saveCard = function(form) {

    var form = document.getElementById( "dynamic-card-form" );
    var json = $scope.toJSONString( form );

    // return false;
    // console.log($scope.memberId);
    // console.log($scope.card);
    // console.log($scope.clubId);
    // console.log($scope.user.data.id);
    var file = $scope.upload($scope.file);

    /**
     * @todo return file as link
     */
    var data = {
      member: $scope.memberId,
      club: $scope.clubId,
      account: $scope.user.data.id,
      form: json,
      card_image_link: file
    };

    console.log(data);

    CardService.createCard(data).then(function(response) {
      console.log(response);
    });
  }

  /**
   * @param form
   * @return form object
   */
  $scope.toJSONString = function( form ) {

		var obj = [];
		var elements = form.querySelectorAll( "input, select, textarea" );

		for( var i = 0; i < elements.length; ++i ) {

			var element = elements[i];

			var name  = element.name;
			var value = element.value;
      var type_val  = element.getAttribute('type');

      obj.push({
        'name' : name,
        'value' : value,
        'type' : type_val
      });
		}

		return JSON.stringify( obj );
	}

  /**
   * @todo create account members api
   * @var $scope.member
   */
  // $scope.getMembers = function() {
  //
  // }

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

    $scope.upload = function(file, type) {

      $scope.awsImageLink = "";

      AWS.config.update({ accessKeyId: $scope.user.aws.access_key, secretAccessKey: $scope.user.aws.secrete_key });
      AWS.config.region = $scope.user.aws.region;

      var bucket = new AWS.S3({ params: { Bucket: $scope.user.aws.bucket } });

      if(file) {
        // Prepend Unique String To Prevent Overwrites
        var uniqueFileName = $scope.uniqueString() + '-' + file.name;

        var params = { Key: 'Staging/' + uniqueFileName, ContentType: file.type, Body: file, ServerSideEncryption: 'AES256' };

        bucket.putObject(params, function(err, data) {

          if(err) {
            console.log(error);
          }
        });

        return (file) ? $scope.awsImageLink = aws.s3StagingLink + '/' + uniqueFileName : '';
      }
      else {
        // No File Selected
        toastr.error('Please select a file to upload');
      }
    };

    $scope.uniqueString = function() {
      var text     = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 8; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    $scope.getClubs();

    //$scope.getMembers();

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
