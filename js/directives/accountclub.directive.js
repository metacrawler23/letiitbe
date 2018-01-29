angular
.module('app')
.directive('createCardForm', createCardForm)
.directive('downloadCardImage', downloadCardImage)
.directive('printCardImage', printCardImage)
.directive('checkMember', checkMember);


function checkMember($compile) {
  var directive = {
    restrict: 'A',
    controller: 'accountClubCtrl',
    link: link
  }
  return directive;

  function link($scope, element, attrs) {
      element.on("blur", function(){

        // alert(JSON.stringify(attrs.club));
            var result = "";
            var content = "";

            angular.forEach($scope.member, function(data, key) {

              if (data.member_number === element.val() && attrs.club === data.club_id) {

             // if (data.member_number === element.val()) {
                  // return club;
                  result = attrs.prefix + data.member_number;
              }
              return result;
            });
            console.log(result);

            if (result) {
                content += '<angular-barcode ng-model = "code" ng-init="code=&#39'+result+'&#39" bc-options="barCodeOptions" bc-class="barcode" bc-type="canvas"></angular-barcode><p class="barcode-number-holder"></p><hr>';
                element.parents('.dynamic-form-wrapper').find('.card-barcode-image').empty();
                element.parents('.dynamic-form-wrapper').find('.error').remove();
                element.parents('.dynamic-form-wrapper').find('.card-barcode-image').append($compile(content)($scope));
                element.parents(".dynamic-form-wrapper").find('.render-wrap').find(".create-card-btn").removeAttr('disabled');
            }else{
                element.parents('.dynamic-form-wrapper').find('.error').remove();
                element.parents('.dynamic-form-wrapper').find('.card-barcode-image').empty();
                element.after('<p class="error mt-5">Code is invalid - Please <a href="#" data-toggle="modal" data-target="#contactModal">click here</a> and we can help.</p>');
                element.parents(".dynamic-form-wrapper").find('.render-wrap').find(".create-card-btn").attr('disabled', 'disabled');

            }
      });
  }

}


function createCardForm(globalService,$compile) {
  var directive = {
    restrict: 'E',
    scope: {
      	formData: '=model'
      },
    link: link
  }
  return directive;

  function link($scope, element, attrs) {

    element.on("click", function(){

        var content = "";

              angular.forEach(JSON.parse($scope.formData.form), function(data, key) {
                console.log(data);
                var required = (data.required) ? 1 : 0;
                var help_text = (typeof data.description !== 'undefined') ? '<span class="tooltip-element" tooltip="'+data.description+'" style="display:inline-block">?</span>' : '';

                    content += "<div class='form-group'>";

                  if (data.type === 'header') {
                      content += "<h2>"+globalService.stripTags(data.label)+"</h2>";
                  }

                  if (data.type === 'text') {

                      content += "<label>"+globalService.stripTags(data.label) + help_text + "</label>";

                      if (data.name === 'member-number') {
                            content += "<input ng-model='member_number' check-member = '' type='"+data.type+"' name='"+data.name+"' data-prefix='"+$scope.formData.club_prefix+"' data-club='"+$scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='form-control' data-required='"+required+"' >";
                      } else if (data.name == 'first-name') {
                            content += "<input ng-model='first_name' type='"+data.type+"' name='"+data.name+"' data-club='"+$scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='form-control' data-required='"+required+"' >";
                      }  else if (data.name == 'last-name') {
                            content += "<input ng-model='last_name' type='"+data.type+"' name='"+data.name+"' data-club='"+$scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='form-control' data-required='"+required+"' >";
                      } else {
                        content += "<input ng-model='' type='"+data.type+"' name='"+data.name+"' data-club='"+$scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='form-control' data-required='"+required+"' >";
                      }

                  }

                  if (data.type === 'number') {

                      content += "<label>"+globalService.stripTags(data.label) +  help_text +"</label>" +
                          "<input type='"+data.type+"' name='"+data.name+"' data-club='"+$scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='form-control' data-required='"+required+"' >";
                  }

                  if (data.type === 'date') {
                      content += "<label>"+globalService.stripTags(data.label) + help_text +"</label>" +
                          "<input type='"+data.type+"' name='"+data.name+"' data-club='"+$scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='form-control dob' data-required='"+required+"' >";
                  }

                  if (data.type === 'file') {
                      // content += "<label>"+globalService.stripTags(data.label) +  help_text +"</label>" +
                      //     "<input id = 'myCropper' type='"+data.type+"' name='"+data.name+"' data-club='"+$scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='"+data.className+"' data-required='"+required+"' >";
                      // content += "<img id='imgLogo' />";

                      content += '<slim data-size="200,200" data-download="true"' +
                                        'data-initial-image="test.jpg"' +
                                        'data-service="slim.service"' +
                                        'data-did-init="slim.init">' +
                                      '<input type="file" name="slim[]"/>' +
                                  '</slim>';
                  }

                  if (data.type === 'textarea') {
                      content += "<label>"+globalService.stripTags(data.label) + help_text +"</label>" +
                          "<textarea class='form-control' data-club='"+$scope.formData.id+"' name='"+ data.name +"' data-required='"+required+"'></textarea>";
                  }

                  if (data.type === 'select') {
                      content += "<label>"+globalService.stripTags(data.label) + help_text +"</label>" +
                          "<select class='form-control' data-club='"+$scope.formData.id+"' name='"+ data.name +"' data-required='"+required+"'>";

                      $.each(data.values, function (k, v) {
                          content += "<option value='"+v.value+"'>"+v.label+"</option>";
                      });

                      content +=  "</select>";
                  }


                content += "</div>";


                // element.parent().find('#render-form').find('.render-wrap').append($compile(content)($scope));


              });
              element.parent().find('#render-form').removeClass('collapse');
              content += "<button ng-click='saveCard(form)' id='button-create' class='create-card-btn btn btn-primary' type='submit' class='' disabled>Create Card</button>";
              element.parent().find('#render-form').find('.render-wrap').append($compile(content)($scope));
              element.remove()

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



//
// function createCardForm($compile,$http,$templateCache) {
//   var templateText, templateLoader, directive = {
//     restrict: 'A',
//     link: link
//   }
//   return directive;
//
//
//
//   function link(scope, element, attrs) {
//
//
//       element.on("click", function(){
//
//
//         var templateUrl = 'views/common/widgets/create-form-card.html';
//         templateLoader = $http.get(templateUrl, {cache: $templateCache}).then(function (res) {
//           // console.log('templateContent: ', JSON.stringify(res.data));
//             element.parent().find('#render-form').removeClass('collapse');
//             element.parent().find('#render-form').find('.render-wrap').append($compile(res.data)(scope));
//         });
//
//         });
//
//        // angular.element(document.getElementById('render-form')).append($compile(templateLoader)(scope));
//       // });
//   }
// }
