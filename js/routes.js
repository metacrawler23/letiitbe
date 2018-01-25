angular
.module('app')
// .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

  $urlRouterProvider.otherwise('/');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
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
            'bower_components/angular-chart.js/dist/angular-chart.min.js'
          ]
          },{
            serie: true,
            name: 'owl carousel',
            files: [
              'libs/owlcarousel/js/owl.carousel.min.js',
              'js/controllers/carousels.controller.js',
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
    templateUrl: 'views/main.html',
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
  .state('app.privacy-policy', {
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
    url: '/account-club',
    controller: 'accountClubCtrl',
    templateUrl: 'views/pages/account_club.html',
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([
          {
            serie: true,
            name: 'AccountClub Non-Angular JS',
            files: [
              'libs/html2canvas/html2canvas.js',
              'libs/print/print.js',
              'libs/slim/slim.kickstart.min.js'
            ]
          }
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/accountclub.controller.js']
        });
      }],
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Account Club Css',
          files: ['libs/slim/slim.min.css']
        }]);
      }]
    }
  })
  .state('app.hotoffers', {
    url: '/hotoffers',
    controller: 'hotofferCtrl',
    templateUrl: 'views/pages/hotoffers.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/hotoffers.controller.js']
        });
      }],

      }
  })
}]);
