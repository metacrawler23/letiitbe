angular
.module('app')
// .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

  $urlRouterProvider.otherwise('/');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  // $breadcrumbProvider.setOptions({
  //   prefixStateName: 'app.main',
  //   includeAbstract: true,
  //   template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  // });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
    //page title goes here
    // ncyBreadcrumb: {
    //   label: 'Root',
    //   skip: true
    // },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Owl Carousel',
          files: ['libs/owlcarousel/css/owl.carousel.min.css',
                  'libs/owlcarousel/css/owl.theme.default.min.css'
                ]
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'chart.js',
          files: [
            'bower_components/chart.js/dist/Chart.min.js',
            'bower_components/angular-chart.js/dist/angular-chart.min.js',
            'libs/bootstrap/dist/js/bootstrap.min.js',
          ]
          },{
            serie: true,
            name: 'owl carousel',
            files: [
              'libs/owlcarousel/js/owl.carousel.min.js',
              'js/controllers/carousels.controller.js',
              'libs/bootstrap/dist/js/bootstrap.min.js',
            ]
          },{
            serie: true,
            name: 'liMarquee',
            files: [
              'libs/limarquee/jquery.liMarquee.js'
            ]
        }]);
      }],
    }
  })
  .state('app.main', {
    url: '/',
    templateUrl: 'views/main_login.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Home',
    },
    //page subtitle goes here
    // params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Ewallet Css',
          files: ['css/ewallet.css']
        }]);
      }],
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([
          {
            serie: true,
            name: 'chart.js',
            files: [
              'bower_components/chart.js/dist/Chart.min.js',
              'bower_components/angular-chart.js/dist/angular-chart.min.js'

            ]
          }
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: [
            'js/controllers/ewallet.controller.js',
            'js/controllers/homeboxes.controller.js'
          ]
        });
      }]
    }
  })

  .state('app.login', {
    url: '/login',
    templateUrl: 'views/pages/login.html',
    controllerAs: 'vm'
  })
  .state('app.register', {
    url: '/register',
    templateUrl: 'views/pages/register.html',
    controllerAs: 'vm'
  })
  .state('app.privacypolicy', {
    url: '/privacy-policy',
    templateUrl: 'views/pages/privacy_policy.html'
  })
  .state('app.faq', {
    url: '/faq',
    templateUrl: 'views/pages/faq.html'
  })
  .state('app.termscondition', {
    url: '/terms-and-condition',
    templateUrl: 'views/pages/terms_condition.html'
  })
  .state('app.accountclub', {
    url: '/accountclub',
    controller: 'accountClubCtrl',
    templateUrl: 'views/pages/account_club.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/accountclub.controller.js']
        });
      }]
    }
  })
  //
  // .state('appSimple', {
  //   abstract: true,
  //   templateUrl: 'views/common/layouts/simple.html',
  //   resolve: {
  //     loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
  //       // you can lazy load files for an existing module
  //       return $ocLazyLoad.load([{
  //         serie: true,
  //         name: 'Font Awesome',
  //         files: ['css/font-awesome.min.css']
  //       },{
  //         serie: true,
  //         name: 'Simple Line Icons',
  //         files: ['css/simple-line-icons.css']
  //       }]);
  //     }],
  //   }
  // })

  // Additional Pages
  // .state('appSimple.login', {
  //   url: '/login',
  //   templateUrl: 'views/pages/login.html'
  // })
  // .state('appSimple.register', {
  //   url: '/register',
  //   templateUrl: 'views/pages/register.html'
  // })
  // .state('appSimple.404', {
  //   url: '/404',
  //   templateUrl: 'views/pages/404.html'
  // })
  // .state('appSimple.500', {
  //   url: '/500',
  //   templateUrl: 'views/pages/500.html'
  // })
}]);
