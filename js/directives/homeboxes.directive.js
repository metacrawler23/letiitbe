angular
.module('app')
.directive('homeBoxesDirective', homeBoxesDirective)
.directive('couponsImgBox', couponsImgBox);

//HomeBox Tiles
function homeBoxesDirective() {
  var directive = {
    restrict: 'A',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {

  }
}


function couponsImgBox() {
  var directive = {
    restrict: 'A',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {


    $(document).ready(function() {
        if ( $( ".coupons_img_box" ).hasClass( "custom_tiles" ) ) {
            var new_width = $('.rewards_blurb_section .coupons_img_box.custom_tiles').css('width').replace('px', '');

            var new_height = Math.round(new_width * 1 / 1.2);
            $(".rewards_blurb_section .coupons_img_box.custom_tiles").css('height', new_height + 'px');
        }
    });


    $(window).on('resize', function(){
        if ( $( ".coupons_img_box" ).hasClass( "custom_tiles" ) ) {
            var new_width = $('.rewards_blurb_section .coupons_img_box.custom_tiles').css('width').replace('px', '');

            // alert(new_width);
            var new_height = Math.round(new_width*1/1.2);
            $(".rewards_blurb_section .coupons_img_box.custom_tiles").css('height',new_height +'px');
        }
    });

    $(document).ready(function() {
        if ( $( ".coupons_img_box" ).hasClass( "default_tiles" ) ) {
            var new_width = $('.rewards_blurb_section .coupons_img_box.default_tiles').css('width').replace('px', '');

            var new_height = Math.round(new_width * 1 / 1.54);
            $(".rewards_blurb_section .coupons_img_box.default_tiles").css('height', new_height + 'px');
        }
    });

    $(window).on('resize', function(){
        if ( $( ".coupons_img_box" ).hasClass( "default_tiles" ) ) {
            var new_width = $('.rewards_blurb_section .coupons_img_box.default_tiles').css('width').replace('px', '');

            // alert(new_width);
            var new_height = Math.round(new_width*1/1.54);
            $(".rewards_blurb_section .coupons_img_box.default_tiles").css('height',new_height +'px');
        }
    });

    $(document).ready(function() {
        if ( $( ".col-row .coupons_img_box" ).hasClass( "default_tiles" ) ) {
            var new_width = $('.rewards_blurb_section .col-row .coupons_img_box.default_tiles').css('width').replace('px', '');

            var new_height = Math.round(new_width * 1 / 0.7);
            $(".rewards_blurb_section .col-row  .coupons_img_box.default_tiles").css('height', new_height + 'px');
        }
    });

    $(window).on('resize', function(){
        if ( $( ".col-row .coupons_img_box" ).hasClass( "default_tiles" ) ) {
            var new_width = $('.rewards_blurb_section .col-row .coupons_img_box.default_tiles').css('width').replace('px', '');

            // alert(new_width);
            var new_height = Math.round(new_width*1/0.7);
            $(".rewards_blurb_section .col-row .coupons_img_box.default_tiles").css('height',new_height +'px');
        }
    });


  }
}
