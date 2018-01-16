angular
.module('app')
.directive('eWalletDirective', eWalletDirective);

//HomeBox Tiles
function eWalletDirective() {
  var directive = {
    restrict: 'A',
    controller: eWalletCtrl,
    templateUrl: 'views/common/widgets/ewallet.html',
    link: link
  }
  return directive;

  function link(scope, element, attrs
  ) {
    var buarr = ["holder_bu_awayL1","holder_bu_center","holder_bu_awayR1"];
    for(var i=1;i<=buarr.length;++i){
        $("#bu"+i).removeClass().addClass(buarr[i-1]+" holder_bu");
    }

        $(".holder_bu").each(function(){
            buarr.push($(this).attr('class'))
        });
        arlen=buarr.length;
        for(var i=0;i<arlen;++i){
            buarr[i]=buarr[i].replace(" holder_bu","")
        };
        $(".holder_bu").each(function(){
            buarr.push($(this).attr('class'))
        });
        arlen=buarr.length;
        for(var i=0;i<arlen;++i){
            buarr[i]=buarr[i].replace(" holder_bu","")
        };
    $(".holder_bu").click(function(buid){
      var me=this,id=this.id||buid,joId=$("#"+id),joCN=joId.attr("class").replace(" holder_bu","");
      var cpos=buarr.indexOf(joCN),mpos=buarr.indexOf("holder_bu_center");
      if(cpos!=mpos){
          tomove=cpos>mpos?arlen-cpos+mpos:mpos-cpos;
          while(tomove){
              var t=buarr.shift();
              buarr.push(t);
              for(var i=1;i<=arlen;++i){
                  $("#bu"+i).removeClass().addClass(buarr[i-1]+" holder_bu");
              }
              --tomove;
          }
      }
    });
    for(i=1;i<=1;++i){
        $(".holder_bu").delay(4000).trigger('click',"bu"+i).delay(4000);
        console.log("called");
    }

  }

}
