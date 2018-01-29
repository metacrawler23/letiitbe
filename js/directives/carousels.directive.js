angular
.module('app')
.directive('ambassadorCarouselDirective', ambassadorCarouselDirective)
.directive('ambassadorCarouselItemDirective', ambassadorCarouselItemDirective)
.directive('bannerAdsCarouselDirective', bannerAdsCarouselDirective)
.directive('bannerAdsCarouselItemDirective', bannerAdsCarouselItemDirective)
.directive('liMarqueeDirective', liMarqueeDirective);


// Ambassador Carousel directive
function ambassadorCarouselDirective($timeout) {
  return {
		restrict: 'A',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function(element) {
			  // provide any default options you want
         $timeout(function () {
      				var defaultOptions = {
                      autoplay:true,
                      autoplayHoverPause:true,
                      loop:true,
                      margin:10,
                      autoplayTimeout:2000,
                      navText: ["<img src='./img/sports/left-arrow.png'>","<img src='./img/sports/right-arrow.png'>"],
                      nav:true,
                      pagination:false,
                      responsive:{
                          0:{
                              items:2
                          },
                          600:{
                              items:3
                          },
                          1000:{
                              items:5
                          }
                      }
      				};
      				var customOptions = scope.$eval($(element).attr('data-options'));
      				// combine the two options objects
      				for(var key in customOptions) {
      					defaultOptions[key] = customOptions[key];
      				}
      				// init carousel
      				$(element).owlCarousel(defaultOptions);
          },50);

      			};

		}
	};
}

// Ambassador Carousel directive
function ambassadorCarouselItemDirective() {
  return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element) {
		  // wait for the last item in the ng-repeat then call init
			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}



// BannerAds Carousel directive
function bannerAdsCarouselDirective($timeout) {
  return {
		restrict: 'A',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function(element) {
			  // provide any default options you want
         $timeout(function () {
      				var defaultOptions = {
                      singleItem: true,
                      autoplay:true,
                      autoplayHoverPause:true,
                      loop:true,
                      margin:10,
                      autoplayTimeout:2000,
                      navText: ["<img src='./img/sports/left-arrow.png'>","<img src='./img/sports/right-arrow.png'>"],
                      nav:true,
                      pagination:false,
                      responsive:{
                          0:{
                              items:1
                          },
                          600:{
                              items:1
                          },
                          1000:{
                              items:1
                          }
                      }
      				};
      				var customOptions = scope.$eval($(element).attr('data-options'));
      				// combine the two options objects
      				for(var key in customOptions) {
      					defaultOptions[key] = customOptions[key];
      				}
      				// init carousel
      				$(element).owlCarousel(defaultOptions);
          },50);

      			};

		}
	};
}

// BannerAds Carousel directive
function bannerAdsCarouselItemDirective() {
  return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element) {
		  // wait for the last item in the ng-repeat then call init
			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}

//Prevent click if href="#"
function liMarqueeDirective() {
  var directive = {
    restrict: 'A',
    link: link,
    scope: true
  }
  return directive;

  function link(scope, element, attrs) {

        element.liMarquee({
            direction: 'left',
            height: '100px',
            circular:true,
            startShow:true
        });

  }
}
