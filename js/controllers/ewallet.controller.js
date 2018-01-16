//main.js
angular
.module('app')
.controller('eWalletCtrl', eWalletCtrl);

eWalletCtrl.$inject = ['$scope'];
function eWalletCtrl($scope) {
  $scope.cards = [
    {
      memberName: 'CJ Cortez',
      memberCard: './img/placeholders/ewallet/card1.png'
    },
    {
      memberName: 'Metacrawler Zetroc',
      memberCard: './img/placeholders/ewallet/card2.png'
    }
   ];
   $scope.balance = '123';
   $scope.contribution = {
     chosenClub: 'Ararat Fitness Centre',
     totalContribution: '143'
   }
   $scope.wishlist = [
      {
          name: 'California Board Swim Short',
          price: 'GBP 19.99',
          earn:	'Earn Up To 4.8% SportsCash',
          image: './img/placeholders/ewallet/wish-image1.jpg'
      },
      {
         name: '4 Poles Teepee Tent w/ Storage Bag Black',
         price: '$112.30 AUD',
         earn:	'Earn $5.35 SportsCash',
         image: './img/placeholders/ewallet/wish-image2.jpeg'
      }
  ];
}
