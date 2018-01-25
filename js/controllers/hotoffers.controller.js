angular
.module('app')
.controller('hotofferCtrl', hotofferCtrl);

hotofferCtrl.$inject = ['$scope'];
function hotofferCtrl($scope) {
    $scope.categories = [

      {
        'categoryID': 'c1',
        'categoryTitle': 'Fast Food'
      },
      {
        'categoryID': 'c2',
        'categoryTitle': 'Health and Fitness'
      },
      {
        'categoryID': 'c3',
        'categoryTitle': 'Movies'
      },
      {
        'categoryID': 'c4',
        'categoryTitle': 'Fuel'
      },
      {
        'categoryID': 'c5',
        'categoryTitle': 'Insurance'
      },
      {
        'categoryID': 'c6',
        'categoryTitle': 'Car Hire'
      },
      {
        'categoryID': 'c7',
        'categoryTitle': 'Experiences'
      },
      {
        'categoryID': 'c8',
        'categoryTitle': 'Competitions'
      }
    ]

    $scope.banners = [
      {
        'bannerID': 'b1',
        'bannerTitle': 'Book Now and Save',
        'bannerImg': 'https://s3-ap-southeast-2.amazonaws.com/cashrewardglobal/assets/uploads/CustomBanner/1508305797_amf-bowling-%281%29--300x250.jpg'
      },
      {
        'bannerID': 'b2',
        'bannerTitle': 'Book Now and Save2',
        'bannerImg': 'https://s3-ap-southeast-2.amazonaws.com/cashrewardglobal/assets/uploads/CustomBanner/1508305643_discount-movie-tickets-300x250.jpg'
      }
    ]

    $scope.relations = [
      {
        'relID': 'r1',
        'categoryID': 'c1',
        'bannerID': 'b1'
      },
      {
        'relID': 'r2',
        'categoryID': 'c2',
        'bannerID': 'b2'
      }
    ]

    $scope.getBannerData = function(parent) {
        var children = [];
        for (var i = 0; i < $scope.banners.length; i++) {
          var banner = $scope.banners[i];
          if (banner.bannerID == parent.bannerID) {
            children.push(banner);
          }
        }
        return children;
    };

    // $scope.getBannerTitle = function(relations) {
    //     //to prevent errors if $scope.clients is not loaded yet
    //     if (!$scope.banners) {
    //         return;
    //     }
    //
    //     for (var c = 0; c < $scope.banners.length; c++) {
    //         var banner = $scope.banners[c];
    //         if (banner.bannerID == relations.bannerID) {
    //             return banner.bannerTitle;
    //         }
    //     }
    // }
    //
    // $scope.getBannerImage = function(relations) {
    //     //to prevent errors if $scope.clients is not loaded yet
    //     if (!$scope.banners) {
    //         return;
    //     }
    //
    //     for (var c = 0; c < $scope.banners.length; c++) {
    //         var banner = $scope.banners[c];
    //         if (banner.bannerID == relations.bannerID) {
    //             return banner.bannerImg;
    //         }
    //     }
    // }

}
