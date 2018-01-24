/**
 * Created by xmmrh on 2018/1/23.
 */
$(function () {
    //首页图片自动滚动
    imgSc = {
        a : document.getElementById("img_scroll"),
        b : document.getElementsByClassName("shop-img-scroll"),
        num : 0,
        initW : 0
    };
    var childCount = imgSc.a.childElementCount / 2;
    imgSc.initW = 360*childCount;
    imgScroll = setInterval(sliderImg,10);
    imgSc.b[0].onmouseover = function () {
        clearInterval(imgScroll);
    }
    imgSc.b[0].onmouseout = function () {
        imgScroll =setInterval(sliderImg,10);
    }
});

function sliderImg(){
    imgSc.num++;
    if(imgSc.num<=imgSc.initW){
        imgSc.a.style.left = -imgSc.num+"px";
    }else{
        imgSc.a.style.left = 0;
        imgSc.num = 0;
    }
}