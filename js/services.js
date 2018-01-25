angular
.module('app')
.factory('globalService', globalService);

function globalService() {
          return {
              stripTags: function(string) {
                string = string.toString();
                return string.replace(/<\/?[^>]+>/gi, '');

              }
          }
}
