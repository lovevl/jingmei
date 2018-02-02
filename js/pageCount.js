function createDocumentByFrame(data, tagname) {//
    var rootElmt = document.createElement(tagname);
    for (var x in data) {
        if ("object" == typeof data[x]&&data[x]!=null&&data[x]!=undefined) {
            for(var y = 0;y<data[x].length;y++){
                rootElmt.appendChild(createDocumentByFrame(data[x][y], x));
            }
        } else if ("string" == typeof data[x] || "number"== typeof data[x]) {
            if (x == "clazz") {
                rootElmt.setAttribute("class", data[x]);
            } else if (x == "innerHTML" || x == "text") {
                rootElmt.innerHTML = data[x];
            } else {
                rootElmt.setAttribute(x, data[x]);
            }
        }
    }
    return rootElmt;
}

window._pageCount={
		createPageCount:function(page) {
			var staticPage_start = Math.floor((page.pageNo - 1) / 5) * 5 + 1;
			var staticPage_end = ((staticPage_start + 4) < page.totalPage) ? (staticPage_start + 4) : page.totalPage;
			var li_pageFirst = [{innerHTML : "<a href=\"javascript:;\">|&laquo;</a>",clazz : "footable-page"}];
			var li_pageNoPre = [{innerHTML : "<a href=\"javascript:;\">&lsaquo;</a>",clazz : "footable-page"}];
			var li_pageStatic = [];
			for (var i = staticPage_start; i < staticPage_end+1; i++) {
				var li = {
					innerHTML : "<a href=\"javascript:;\">" + i + "</a>",
					clazz : "footable-page"
				};
				li_pageStatic[li_pageStatic.length] = li;
			}
			var li_pageNoNext = [{ innerHTML : '<a href=\"javascript:;\">&rsaquo;</a>',clazz : "footable-page" }];
			var li_pageLast = [{ innerHTML : '<a  href=\"javascript:;\">&raquo;|</a>',clazz : "footable-page" }];
			var li_pageTotal = [{ innerHTML : '<a  href=\"javascript:;\">第'+page.pageNo+'/'+page.totalPage+'页</a>',clazz : "footable-page disabled" }];
			var lis = li_pageFirst.concat(li_pageNoPre).concat(li_pageStatic).concat(li_pageNoNext).concat(li_pageLast).concat(li_pageTotal);
			var ul = createDocumentByFrame({
				li : lis
			}, "ul");
			window._pageCount.initPageFunc(ul);
			window._pageCount.setPageClass(ul);
			return ul;
		},
		initPageFunc : function(ul){
			var lis = $(ul).children("li");
			lis[0].onclick = window._pageCount.fistPage;
			lis[1].onclick = window._pageCount.prePage;
			for(var i = 2;i<lis.length - 3;i++){
				lis[i].onclick = window._pageCount.goPage;
			}
			lis[lis.length - 3].onclick = window._pageCount.nextPage;
			lis[lis.length - 2].onclick = window._pageCount.lastPage;
		},
		fistPage : function(){
			if (n.page.pageNo > 1) {
				n.page.pageNo = 1;
				n.querys();
				$(this).addClass("disabled");
			} else {
				$(this).addClass("disabled");
				return false;
			}
		},
		prePage : function() {
			if (n.page.pageNo > 1) {
				n.page.pageNo--;
				n.querys();
			} else {
				return false;
			}
		},
		nextPage : function() {
			if (n.page.pageNo < n.page.totalPage) {
				n.page.pageNo++;
				n.querys();
			} else {
				return false;
			}
		},
		lastPage : function() {
			if (n.page.pageNo < n.page.totalPage) {
				n.page.pageNo = n.page.totalPage;
				n.querys();
				$(this).addClass("disabled");
			} else {
				$(this).addClass("disabled");
				return false;
			}
		},
		goPage : function(){
			var	pageNo = $(this).find("a")[0].innerHTML;
			if(pageNo>0){
				n.page.pageNo=pageNo;
				n.querys();
			}
		},
		setPageClass : function(ul) {
			var $li = $(ul).children("li");
			var length = $li.length;
			(function(p){
				if(p.pageNo == 1){
					$li.eq(0).addClass("disabled");
					$li.eq(1).addClass("disabled");
				}
				if(p.pageNo == p.totalPage){
					$li.eq(length-3).addClass("disabled");
					$li.eq(length-2).addClass("disabled");
				}
				for(var i = 2; i < length-3; i++){
					if($li.eq(i).find("a").text() == p.pageNo){
						$li.eq(i).addClass("active");
					}
				}
			})(n.page);
		},
		refresh_paganation : function(jq_paganation) {
			jq_paganation.empty().append(createPageCount(n.page));
		}
};
window.createPageCount=window._pageCount.createPageCount;