angular
.module('app')
.directive('homeBoxesDirective', homeBoxesDirective);

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
