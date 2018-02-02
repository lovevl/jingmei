/**
 * Created by xmmrh on 2018/2/2.
 */
$(function () {
    n.initOptionsFn();
    n.querys();
});

n = {
    options : {
        type: null,
        title: null,
        pageNo : 1,
        length : 10
    },
    page: {
        pageNo: 1,
        length: 10
    },
    querys : function () {
        u.ajaxFn();
    },
    $menuDiv : $('#menu_bar_id'),
    initOptionsFn : function () {
        var thisUrl = window.location.href;
        var $lis = n.$menuDiv.find('li');
        $lis.removeClass("active");
        if(thisUrl.indexOf("jm")>-1){
            n.options.type = 1;
            $lis.eq(0).addClass("active");
        }else if(thisUrl.indexOf("hy")>-1){
            n.options.type = 2;
            $lis.eq(1).addClass("active");
        }else if(thisUrl.indexOf("gzn")>-1){
            n.options.type = 3;
            $lis.eq(2).addClass("active");
        }else if(thisUrl.indexOf("zz")>-1){
            n.options.type = 4;
            $lis.eq(3).addClass("active");
        }

    }
};


u = {
    $ul : $('#news_list_id'),
    $pag : $('.pagination'),
    ajaxFn : function () {
        n.options.pageNo = n.page.pageNo;
        n.options.length = n.page.length;
        $.ajax({
            url : "http://immrh.cn/jm/news/list.json",
            data : n.options,
            type : "POST",
//                contentType : "application/json;charset=utf-8",
            success : function (data) {
                if(data.result == true){
                    n.page = data.data.page;
                    if(data.data.list)
                        u.$pag.empty().append(createPageCount(n.page));
                    u.listFn(data.data.list);
                }
            },
            error : function () {

            }
        });
    },
    listFn : function (d) {
        u.$ul.empty();
        if(d){
            for(var i=0; i < d.length; i++){
                var $li = $('<li></li>');
                var strHtml = '<div class="row"><div class="col-xs-4 col-md-3 img"><div class="img-box"><img src="' + d[i].imgUrl +
                    '" alt=""></div></div><div class="col-xs-8 col-md-9 body "><p class="title"><a href="' + d[i].url +
                    '">' + d[i].title +
                    '</a></p><p class="content">' + d[i].detail +
                    '</p><span>' + d[i].pubTime +
                    '</span></div></div><div class="e-border-line"></div><div class="f-border-line"></div>';
                $li.html(strHtml);
                u.$ul.append($li);
            }
        }
    },
};