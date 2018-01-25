angular
.module('app')
.factory('globalService', globalService);
// .factory('stripTagsService', stripTagsService);
//
// stripTagsService.$inject = ['$q'];
// function stripTagsService($q) {
// var service = {};
//
// stripTagsService.stripTags = stripTags;
// function stripTags(string) {
//           string = string.toString();
//           return string.replace(/<\/?[^>]+>/gi, '');
//           alert(string);
//         }
// }
function globalService() {
          return {
              stripTags: function(string) {
                string = string.toString();
                return string.replace(/<\/?[^>]+>/gi, '');

              }
          }
}
//
// .factory('myService', function() {
//         return {
//             foo: function() {
//                 alert("I'm foo!");
//             }
//         };
//     });
