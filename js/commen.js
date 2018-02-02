/**
 * Created by xmmrh on 2018/1/21.
 */

$(function () {


    // 固定nav栏
    nav = {
        bar : document.getElementById("nav_bar_id"),
        adbar : document.getElementById("ad_bar_id"),
        picId : document.getElementById("first_pic_id"),
        fixed : function () {
            var barTop = nav.bar.offsetTop;
            var adBarTop = parseInt(getStyle(nav.adbar,"marginTop"));
            var clientW = client().width;
            var className = "backColor";
            var $bar = $(nav.bar);
            if(clientW < 768){
                className = "backColor-mobile";
                if($bar.hasClass('backColor')){
                    $bar.removeClass('backColor').addClass('backColor-mobile');
                }
            }

            $(window).scroll(function () {
                if (scroll().top >= barTop || scroll().top <= 0) {
                    nav.bar.className = "nav-bar fixed";
                    nav.adbar.style.marginTop = adBarTop + nav.bar.offsetHeight + "px";
                } else {
                    nav.bar.className = "nav-bar";
                    nav.adbar.style.marginTop = 0;
                }
                if (nav.picId) {
                    nav.adbar.style.marginTop = 0;
                    var picHeight = nav.picId.offsetHeight;
                    if (scroll().top > barTop + picHeight) {
                        $bar.addClass(className);
                    } else {
                        $bar.removeClass(className);
                    }
                } else {
                    $bar.addClass(className);
                }
                //左侧菜单栏的fixed定位
                if(client().width > 768) {
                    if (menu.$menu.length > 0) {
                        menu.fnMenu();
                    }
                }
            });
        }
    };

    nav.fixed();

});

menu ={
    $menu : $('#menu_id'),
    $link : $('.menu-bar li'),
    fnColor : function () {
        $.each(menu.$link,function (i,n) {
            var $n = $(n);
            var rgbColor  = $n.find(".color-block").css("background-color");
            if($n.hasClass("active")){
                $n.css("background-color",rgbColor);
            };
            n.onmouseover = function () {
                $n.css("background-color",rgbColor);
            };
            n.onmouseout = function () {
                if(!$n.hasClass("active")){
                    $n.css("background-color","transparent");
                }
            };
            n.addEventListener("click",function () {
                menu.$link.removeClass("active");
                $n.addClass("active");
                menu.$link.not($n).css("background-color","transparent");
            });
        });
    },
    fnMenu : function () {
        if(menu.$menu.length > 0) {
            var aboutTop = menu.$menu.offset().top;
            var menuBar = menu.$menu.find('.menu-bar');
            var navBarHeight = document.getElementById('nav_bar_id').offsetHeight;
            if (scroll().top >= aboutTop - navBarHeight) {
                menuBar.addClass("fixed");
                menuBar.css('top', navBarHeight);
            } else {
                menuBar.removeClass('fixed');
                menuBar.css('top', 0);
            }
        }
    },
    init : function () {
        menu.fnColor();
        menuContent.init();
    }
};

menuContent = {
    $carousel : $('#carousel-ol'),
    $hiddenBox : $('.item-pic'),
    $menuLi : $('.menu-bar li.active'),
    $borderColor : $('.f-border-line'),
    $service : $('#service_id'),
    rbg : '',
    initItemColorFn : function () {
        if(menuContent.$hiddenBox.length > 0) {
            var rbgColor = menuContent.$menuLi.css("background-color");
            menuContent.rbg = rbgColor;
            $.each(menuContent.$hiddenBox, function (i, n) {
                n.style.backgroundColor = rbgColor;
            });
        }
    },
    initCarouselColorFn : function () {
        if(menuContent.$carousel.length > 0){
            var rbgColor = menuContent.rbg==''?menuContent.$menuLi.css("background-color"):menuContent.rbg;
            // console.log(rbgColor);
            var $style = $('<style>.carousel-indicators .active{border-color:'+rbgColor+'}</style>');
            $('head').append($style);
        }
    },
    initBorderLineColorFn : function () {
        if(window.location.href.indexOf("news") > -1){
            var rbgColor = menuContent.rbg==''?menuContent.$menuLi.css("background-color"):menuContent.rbg;
            $('head').append($('<style>.f-border-line{background-color:'+rbgColor+'}</style>'));
            // menuContent.$borderColor.css("background-color",rbgColor);
        }
    },
    fnService : function () {
        if(menuContent.$service.length > 0){
            var rbgColor = menuContent.rbg==''?menuContent.$menuLi.css("background-color"):menuContent.rbg;
            menuContent.$service.find('i').css("color",rbgColor);
            var $oldstyle = $('#service_style');
            if($oldstyle.length > 0){
                $oldstyle.remove();
            }
            var $style = $('<style id="service_style">.service a:hover{color:'+rbgColor+';}</style>');
            $('head').append($style);
        }
    },
    init : function () {
        menuContent.initItemColorFn();
        menuContent.initCarouselColorFn();
        menuContent.initBorderLineColorFn();
        menuContent.fnService();
    }
};
