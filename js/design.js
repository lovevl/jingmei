/**
 * Created by xmmrh on 2018/1/28.
 */
$(function () {

    boxVisual = {
        $pics : $('#pictures').children(),
        clientH : 0,
        initVisualFn : function () {
            var clientW = client().width;
            boxVisual.clientH = parseInt(client().height/2);
            if(clientW <=768) {
                $(window).scroll(function () {
                    $.each(boxVisual.$pics, function (i, n) {
                        var $n = $(n).find('.describe');
                        var visualTop = n.getBoundingClientRect().top;
                        if ((visualTop > 0 && visualTop <= boxVisual.clientH) || (visualTop < 0 && n.offsetHeight + visualTop > boxVisual.clientH)) {
                            $n.css('bottom', 0);
                        } else {
                            $n.css('bottom', '-26px');
                        }
                    });
                });
            }
        },
        init : function () {
            boxVisual.initVisualFn();
        }
    };
    boxVisual.init();
});