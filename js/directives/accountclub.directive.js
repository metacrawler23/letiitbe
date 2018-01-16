angular
.module('app')
.directive('getClubLayout', getClubLayout);

function getClubLayout() {
  var directive = {
    restrict: 'A',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {

    element.on('change', function(e){
      e.preventDefault();
      var $this   = $(e.currentTarget);
       var form    = $this.find('option:selected').data('form');
       var content = '';

       // $(".cards-created").html("");
       $(".newly-added").remove();

           content += '<div class="newly-added addcard-container text-center">' +
                       '<div class="club-card">' +
                   '<a href="javascript:;" class="club-card-header">' +
                       '<img class="img-responsive" src="'+$this.find('option:selected').data('club-banner')+'">' +
                   '</a>' +
                   '<div class="dynamic-form-wrapper">' +

                       '<div class="dynamic-form-header">' +
                       '<span>No Text</span>' +
                       '</div>' +
                       '<h4 class = "club-name">'+$this.find('option:selected').data('club-name')+'</h4>' +
                       '<div id="render-form-'+$this.find('option:selected').data('club')+'" class="collapse">' +
                           '<form class="render-wrap text-left" role="form">' +
                           '</form>' +
                           '<div class="dynamic-card-wrapper clearfix">' +
                               '<span class="avatar pull-left" style="display: none;margin-top: 20px;">' +
                                   '<img src="" width="80px" alt="placeholder" style="margin: 0 auto;display: block;"/>' +
                               '</span>' +
                           '</div>' +
                           '<img class="card-barcode-image" src="" style="width: 80%;margin: 0 auto 10px;display: block;"/>' +
                            '<span class="card-barcode"></span>' +
                       '</div>';

                       // content += '<button class="btn btn-primary mb-20" id="button-'+$this.val()+'" data-club="'+$this.val()+'" data-toggle="collapse" data-target="#render-form-'+$this.find('option:selected').data('club')+'">Create Card</button>';
                       content += "<button class='btn btn-primary mb-20' data-toggle='collapse' data-club='"+$this.val()+"' data-form='"+JSON.stringify(form)+"' data-target='#render-form-"+$this.find('option:selected').data('club')+"'>Create Card</button>";
                     content +=  '<div class="dynamic-form-footer" style="margin-top: 10px">' +
                           '<span>No Text</span>' +
                       '</div>' +
                   '</div>' +
                         '</div>' +
                         // '<div class="check mt-10"  style="text-align: left; display: none" >' +
                         //   '<input type="checkbox" value="" class="email-copy">&nbsp;Email a Copy' +
                         // '</div>' +
               '</div>';

       $(".cards-created").append(content);
    });
  }
}
