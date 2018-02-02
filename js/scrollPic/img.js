$(function(){
		window.beginPage = 2;
		w = {
			$lightbox : $(".lightboxOverlay"),
			$img : $(".img_inner img")
		}
});

	lookingImg = function(obj){
		// $('body').css('overflow-y','hidden');
		var imgObj = $(obj).find("img")[0];
		var img = imgObj.src;
		var newImg = img;
		var nWidth,nHeight;
		if(imgObj.naturalHeight){
			nWidth = imgObj.naturalWidth;
			nHeight  = imgObj.naturalHeight;
		}else{
			var image = new Image();
			image.src = imgObj.src;
			nWidth = image.width;
			nHeight = image.height;
		}
		//w.$img.parent().css({"width":nWidth,"heigth":nHeight});
		w.$lightbox.removeClass('hidden');
		w.$img.parents(".img_box").removeClass('hidden');
		w.$img.attr("src",newImg); 
		slowloadimg(w.$img[0]);
	}
	
	slowloadimg = function(obj){
		var average = 1/150;
		var opa = 0;
		var t = setInterval(function(){
					opa += average;
					obj.style.opacity = opa;
				if(opa > 0.99)window.clearInterval(t);
		},1);
	
	}
	
	slowHide = function(obj){
        // $('body').css('overflow-y','scroll');
		var avg = 1/120;
		var opa = 1;
		var opa0 = 0.75;
		var a = $(obj).parent(),b = $(obj).parent().prev();
		var t1 = setInterval(function(){
					opa -= avg;
					opa0 -= avg;
					a[0].style.opacity = opa;
					b[0].style.opacity = opa0;
				if(opa < 0){window.clearInterval(t1);a.addClass('hidden').css("opacity",1);b.addClass('hidden').css("opacity",0.75);}
		},1);
	}