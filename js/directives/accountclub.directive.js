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
              if (data.memberNumber === element.val() && attrs.club === data.clubId) {
                  // return club;
                  result = data.barCode;
              }
              return result;
            });
            alert(result);
            if (result) {
                content += '<angular-barcode ng-model = "code" ng-init="code=&#39'+result+'&#39" bc-options="barCodeOptions" bc-class="barcode" bc-type="canvas"></angular-barcode><p class="barcode-number-holder"></p><hr>';
                element.parents('.dynamic-form-wrapper').find('.card-barcode-image').append($compile(content)($scope));
            }else{
                element.after('<p class="error mt-5">Code is invalid - Please <a href="#" data-toggle="modal" data-target="#contactModal">click here</a> and we can help.</p>');
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



              angular.forEach($scope.formData.form, function(data, key) {

                var required = (data.required) ? 1 : 0;
                var help_text = (typeof data.description !== 'undefined') ? '<span class="tooltip-element" tooltip="'+data.description+'" style="display:inline-block">?</span>' : '';
                  var content = "";
                    content += "<div class='form-group'>";

                  if (data.type === 'header') {
                      content += "<h2>"+globalService.stripTags(data.label)+"</h2>";
                  }

                  if (data.type === 'text') {

                      content += "<label>"+globalService.stripTags(data.label) + help_text + "</label>";

                      if (data.name === 'member-number') {
                            content += "<input check-member = '' type='"+data.type+"' name='"+data.name+"' data-club='"+$scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='"+data.className+"' data-required='"+required+"' >";
                        } else {
                            content += "<input type='"+data.type+"' name='"+data.name+"' data-club='"+$scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='"+data.className+"' data-required='"+required+"' >";
                        }

                  }

                  if (data.type === 'number') {

                      content += "<label>"+globalService.stripTags(data.label) +  help_text +"</label>" +
                          "<input type='"+data.type+"' name='"+data.name+"' data-club='"+$scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='"+data.className+"' data-required='"+required+"' >";
                  }

                  if (data.type === 'date') {
                      content += "<label>"+globalService.stripTags(data.label) + help_text +"</label>" +
                          "<input type='"+data.type+"' name='"+data.name+"' data-club='"+$scope.formData.id+"' placeholder='"+globalService.stripTags(data.label)+"' class='"+data.className+" dob' data-required='"+required+"' >";
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
                          "<textarea class='"+data.className+"' data-club='"+$scope.formData.id+"' name='"+ data.name +"' data-required='"+required+"'></textarea>";
                  }

                  if (data.type === 'select') {
                      content += "<label>"+globalService.stripTags(data.label) + help_text +"</label>" +
                          "<select class='"+data.className+"' data-club='"+$scope.formData.id+"' name='"+ data.name +"' data-required='"+required+"'>";

                      $.each(data.values, function (k, v) {
                          content += "<option value='"+v.value+"'>"+v.label+"</option>";
                      });

                      content +=  "</select>";
                  }

                  if (data.type === 'button') {
                      this.$btnCount += 1;
                      content += "<button id='button-create' class='create-card-btn btn btn-primary' type='button' class='"+data.className+"' disabled>"+globalService.stripTags(data.label)+"</button>";
                  }

                content += "</div>";

                element.parent().find('#render-form').removeClass('collapse');
                element.parent().find('#render-form').find('.render-wrap').append($compile(content)($scope));

              });

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
