angular
.module('app')
.directive('createCardForm', createCardForm)
.directive('downloadCardImage', downloadCardImage)
.directive('printCardImage', printCardImage)
.directive('checkMember', checkMember)
.directive('file', file)
.directive('displayForms', displayForms)

function displayForms($compile,AccountService,ClubsService) {
  var directive = {
    restrict: 'A',
    link: link
  }
  return directive;

  function link($scope, element, attrs) {
            $scope.user  = JSON.parse(localStorage.getItem('user'));

            $scope.data = AccountService.getAccountMembers($scope.user.data.id);

            $scope.data.then(function successCallback(response) {




                  angular.forEach(response.data, function(data, key) {

                      ClubsService.getOne(data.club_id).then(function successCallback(response) {
                        $scope.getClubData = response.data;

                        var clubData = $scope.getClubData;
                        console.log(clubData);
                      var content = "";

                      content = '<div class="newly-added addcard-container text-center">' +
                                '<div class="club-card">' +
                                '<a href="javascript:;" class="club-card-header">' +
                                '<img class="img-responsive" src="'+ $scope.getClubData.front_card_image +'">' +
                                '</a>' +
                                '<div class="dynamic-form-wrapper">' +
                                '<div class="dynamic-form-header">' +
                                '<span>No Text</span>' +
                                '</div>' +
                                '<h4 class="club-name">'+ $scope.getClubData.name +'</h4>' +
                                '<div id="render-form" class="collapse">' +
                                '<form id="dynamic-card-form" class="render-wrap text-left" name="form" role="form" ng-controller="accountClubCtrl as card">' +
                                '</form>' +
                                '<div class="dynamic-card-wrapper clearfix">' +
                                '<span class="avatar pull-left" style="display: none;margin-top: 20px;">' +
                                '<img src="" width="80px" alt="placeholder" style="margin: 0 auto;display: block;"/>' +
                                '</span>' +
                                '</div>' +
                                '<div class = "card-barcode-image"></div>' +
                                '</div>' +
                                '<create-card-form model="clubData" class="btn btn-primary mb-20">Create Card</create-card-form>' +
                                '<div class="dynamic-form-footer" style="margin-top: 10px">' +
                                '<span>No Text</span>' +
                                '</div>' +
                                '</div>' +
                                ' </div>' +
                                '</div>';
                                element.after().append($compile(content)($scope));



                    });



                  });


              });

    }

  }



function checkMember($compile,MemberService) {
  var directive = {
    restrict: 'A',
    link: link,
    controller: 'accountClubCtrl'
  }
  return directive;

  function link($scope, element, attrs) {

    element.on("blur", function(){


      $scope.data = MemberService.checkMemberNumber(element.val(), attrs.club);

      $scope.data.then(function successCallback(response) {
          console.log(response.data.member);


          var barcode = "";
          var member  = "";
          var first_name  = "";
          var last_name  = "";
          var content = "";

          $scope.member = response.data.member;

          barcode = $scope.member.barcode;
          member  = $scope.member.id;
          first_name = $scope.member.first_name;
          last_name  = $scope.member.last_name;

          $scope.memberId = $scope.member.id;

        content += '<angular-barcode ng-model = "code" ng-init="code=&#39'+barcode+'&#39" bc-options="barCodeOptions" bc-class="barcode" bc-type="canvas"></angular-barcode><p class="barcode-number-holder"></p><hr>';
        element.parents('.dynamic-form-wrapper').find('.card-barcode-image').empty();
        element.parents('.dynamic-form-wrapper').find('.error').remove();

        element.parents('.dynamic-form-wrapper').find('.card-barcode-image').append($compile(content)($scope));
        element.parents('.dynamic-form-wrapper').find('input[name="member_id"]').val(member);
        element.parents('.dynamic-form-wrapper').find('input[name="first-name"]').val(first_name);
        element.parents('.dynamic-form-wrapper').find('input[name="last-name"]').val(last_name);

        element.parents(".dynamic-form-wrapper").find('.render-wrap').find(".create-card-btn").removeAttr('disabled');



      }, function errorCallback(response) {

        element.parents('.dynamic-form-wrapper').find('.error').remove();
        element.parents('.dynamic-form-wrapper').find('.card-barcode-image').empty();
        element.parents('.dynamic-form-wrapper').find('input[name="member_id"]').val('');
        element.parents('.dynamic-form-wrapper').find('input[name="first-name"]').val('');
        element.parents('.dynamic-form-wrapper').find('input[name="last-name"]').val('');
        element.after('<p class="error mt-5">Code is invalid - Please <a href="#" data-toggle="modal" data-target="#contactModal">click here</a> and we can help.</p>');
        element.parents(".dynamic-form-wrapper").find('.render-wrap').find(".create-card-btn").attr('disabled', 'disabled');


    });


    });
  }

}


function createCardForm(globalService,$compile) {
  var directive = {
    restrict: 'E',
    controller: 'accountClubCtrl',
    scope: {
      	formData: '=model'
      },
    link: link
  }
  return directive;

function link(scope, element, attrs) {

    element.on("click", function() {
      var content = "";

      scope.clubId = scope.formData.id;

      angular.forEach(JSON.parse(scope.formData.form), function(data, key) {

          var required = (data.required) ? 1 : 0;
          var help_text = (typeof data.description !== 'undefined') ? '<span class="tooltip-element" tooltip="'+data.description+'" style="display:inline-block">?</span>' : '';

          content += "<div class='form-group'>";

          if (data.type === 'header') {
              content += "<h2>"+globalService.stripTags(data.label)+"</h2>";
          }

          if (data.type === 'text') {

              content += "<label>"+globalService.stripTags(data.label) + help_text + "</label>";

              if (data.name === 'member-number') {
                    content += "<input ng-model='card.member_number' check-member = '' type='"+data.type+"' name='"+data.name+"' data-prefix='"+scope.formData.club_prefix+"' data-club='"+scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='form-control' data-required='"+required+"' >";
              } else if (data.name == 'first-name') {
                    content += "<input ng-model='card.first_name' type='"+data.type+"' name='"+data.name+"' data-club='"+scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='form-control' data-required='"+required+"' >";
              }  else if (data.name == 'last-name') {
                    content += "<input ng-model='card.last_name' type='"+data.type+"' name='"+data.name+"' data-club='"+scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='form-control' data-required='"+required+"' >";
              } else {
                content += "<input ng-model='' type='"+data.type+"' name='"+data.name+"' data-club='"+scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='form-control' data-required='"+required+"' >";
              }

          }

          if (data.type === 'number') {

              content += "<label>"+globalService.stripTags(data.label) +  help_text +"</label>" +
                  "<input type='"+data.type+"' name='card."+data.name+"' data-club='"+scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='form-control' data-required='"+required+"' >";
          }

          if (data.type === 'date') {
              content += "<label>"+globalService.stripTags(data.label) + help_text +"</label>" +
                  "<input type='"+data.type+"' name='card."+data.name+"' data-club='"+scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='form-control dob' data-required='"+required+"' >";
          }

          if (data.type === 'file') {
              // content += "<label>"+globalService.stripTags(data.label) +  help_text +"</label>" +
              //     "<input id = 'myCropper' type='"+data.type+"' name='"+data.name+"' data-club='"+$scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='"+data.className+"' data-required='"+required+"' >";
              // content += "<img id='imgLogo' />";

              // content += '<slim data-size="200,200" data-download="true"' +
              //                   'data-initial-image="test.jpg"' +
              //                   'data-service="slim.service"' +
              //                   'data-did-init="slim.init">' +
              //                 '<input type="file" name="slim[]"/>' +
              //             '</slim>';

              content += "<input type='file' class='form-control' ng-model='card.file' file>";
          }

          if (data.type === 'textarea') {
              content += "<label>"+globalService.stripTags(data.label) + help_text +"</label>" +
                  "<textarea class='form-control' data-club='"+scope.formData.id+"' name='"+ data.name +"' data-required='"+required+"'></textarea>";
          }

          if (data.type === 'select') {
              content += "<label>"+globalService.stripTags(data.label) + help_text +"</label>" +
                  "<select class='form-control' data-club='"+scope.formData.id+"' name='"+ data.name +"' data-required='"+required+"'>";

              $.each(data.values, function (k, v) {
                  content += "<option value='"+v.value+"'>"+v.label+"</option>";
              });

              content +=  "</select>";
          }


          content += "</div>";

          // element.parent().find('#render-form').find('.render-wrap').append($compile(content)($scope));

        });

        content += "<input ng-model='card.member_id' type='hidden' name='member_id' />";

        element.parent().find('#render-form').removeClass('collapse');
        content += "<button ng-click='saveCard()' id='button-create' class='create-card-btn btn btn-primary' type='submit' class='' disabled>Create Card</button>";
        element.parent().find('#render-form').find('.render-wrap').append($compile(content)(scope));
        element.remove();

      });
    }
}

function downloadCardImage() {
  var directive = {
    restrict: 'A',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {

      element.on("click", function(){
      element.parents('.modal-body').find('.banner_img').css('display', 'block');
      element.parents('.modal-body').find('.banner_img').css('margin', '0 auto');
      element.parents('.card-modal-buttons').css('display', 'none');

        var div = element.parents('.modal-content');
        // var div = $("#content");
        var h = div.height() + 10;
        var w = div.width();

        html2canvas(div,{
            useCORS: true,
            logging: true,
            letterRendering: true,
            allowTaint: true,
            width: w,
            height: h
            }).then(function (canvas) {

              // canvas.getContext('2d');
             var myImage = canvas.toDataURL('image/png');
             // $this.parents(".dynamic-form-wrapper").find('.new-image').attr('src', myImage);

             console.log(myImage);

             var imagelink = document.createElement('a');
             // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
             imagelink.href = myImage;
             imagelink.download = 'digital-card.jpg';
             if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) { //iOS = Iphone, Ipad, etc.
                 alert("Your Sportspass Card will now open in another window. To save it, long-press and choose Save Image.");
                 imagelink.target = "_blank";
             }


             element.parents('.card-modal-buttons').css('display', 'block');
             element.parents('.modal-body').find('.banner_img').css('display', 'none');

          });
        });

       // angular.element(document.getElementById('render-form')).append($compile(templateLoader)(scope));
      // });
  }
}


function printCardImage() {
  var directive = {
    restrict: 'A',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {

      element.on("click", function(){
      element.parents('.modal-body').find('.banner_img').css('display', 'block');
      element.parents('.modal-body').find('.banner_img').css('margin', '0 auto');
      element.parents('.card-modal-buttons').css('display', 'none');

        var div = element.parents('.modal-content');
        // var div = $("#content");
        var h = div.height() + 10;
        var w = div.width();

        html2canvas(div,{
          useCORS: true,
          logging: true,
          letterRendering: true,
          allowTaint: true,
          width: w,
          height: h
          }).then(function (canvas) {

            // canvas.getContext('2d');
           var myImage = canvas.toDataURL('image/png');
           // $this.parents(".dynamic-form-wrapper").find('.new-image').attr('src', myImage);



           element.parents('.modal-body').find('.print-holder').attr('src', myImage);
           element.parents('.modal-body').find('.print-holder').print();

           element.parents('.card-modal-buttons').css('display', 'block');
           element.parents('.modal-body').find('.banner_img').css('display', 'none');

          });
        });
       // angular.element(document.getElementById('render-form')).append($compile(templateLoader)(scope));
      // });
  }
}

function file() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.$parent.file = file;
        scope.$apply();
      });
    }
  };
}
