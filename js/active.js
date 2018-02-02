/**
 * Created by xmmrh on 2018/1/27.
 */
$(function () {

    mobileSc.init();

});

mobileSc = {
    $ul : $('#prom_list_id'),
    $childs : null,
    arrLiH : [],
    clientH : 0,
    initParamFn : function () {
        mobileSc.clientH = parseInt(client().height/2);
        if(mobileSc.$ul.length>0){
            mobileSc.$childs = mobileSc.$ul.children();
            mobileSc.arrLiH.push(mobileSc.$ul.offset().top);
            $.each(mobileSc.$childs,function (i,n) {
                mobileSc.arrLiH.push(n.offsetHeight);
            });
        }
    },
    initScrollFn : function () {
        $(window).scroll(function () {
            var scrollH = scroll().top + mobileSc.clientH;
            var temp,now = 0;
            for(var i in mobileSc.arrLiH){
                now += mobileSc.arrLiH[i];
                var j = 1+parseInt(i);
                if(j < mobileSc.arrLiH.length){
                    temp = now + mobileSc.arrLiH[j];
                }else{
                    mobileSc.$childs.siblings().css({'border-color':'#d0d0d0','z-index':0});
                    break;
                }
                if(scrollH > now && scrollH > temp){
                    continue;
                }else if(scrollH >= now && scrollH <= temp){
                    mobileSc.$childs.siblings().css({'border-color':'#d0d0d0','z-index':0});
                    mobileSc.$childs.eq(i).css({'border-color':'#f40','z-index':1});
                    break;
                }else if(i==mobileSc.arrLiH.length && scrollH > temp){
                    mobileSc.$childs.siblings().css({'border-color':'#d0d0d0','z-index':0});
                }
            }
        });
    },
    initBoxScroll : function () {
        if(mobileSc.$ul.length>0){
            mobileSc.$childs = mobileSc.$ul.children();
            mobileSc.clientH = parseInt(client().height/2);

            $(window).scroll(function () {
                $.each(mobileSc.$childs,function (i,n) {
                    var $n = $(n);
                    var visualTop = n.getBoundingClientRect().top;
                    console.log(i+'----top:'+visualTop+"  client:"+mobileSc.clientH);
                    if((visualTop>0 &&visualTop <= mobileSc.clientH) || (visualTop<0 &&n.offsetHeight+visualTop>mobileSc.clientH)){
                        $n.css({'border-color':'#f40','z-index':1});
                    }else{
                        $n.css({'border-color':'#d0d0d0','z-index':0});
                    }

                });
            });
        }
    },
    init : function () {
        // mobileSc.initParamFn();
        // mobileSc.initScrollFn();

        mobileSc.initBoxScroll();
    }
};


