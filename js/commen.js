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
            if(clientW < 768){
                className = "backColor-mobile";
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
                        $(nav.bar).addClass(className);
                    } else {
                        $(nav.bar).removeClass(className);
                    }
                } else {
                    $(nav.bar).addClass(className);
                }
                //左侧菜单栏的fixed定位
                if (menu.$menu.length > 0) {
                    menu.fnMenu();
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
        if(menu.$menu) {
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
    $hiddenBox : $('.tech-content .hidden-box'),
    $menuLi : $('.menu-bar li.active'),
    initItemColorFn : function () {
        if(menuContent.$hiddenBox.length > 0) {
            var rbgColor = menuContent.$menuLi.css("background-color");
            $.each(menuContent.$hiddenBox, function (i, n) {
                n.style.backgroundColor = rbgColor;
            });
        }
    },
    initCarouselColorFn : function () {
        if(menuContent.$carousel.length > 0){
            var rbgColor = menuContent.$menuLi.css("background-color");
            console.log(rbgColor);
            var $style = $('<style>.carousel-indicators .active{border-color:'+rbgColor+'}</style>');
            $('head').append($style);
        }
    },
    init : function () {
        menuContent.initItemColorFn();
        menuContent.initCarouselColorFn();
    }
};
