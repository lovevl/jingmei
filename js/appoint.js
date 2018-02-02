/**
 * Created by xmmrh on 2018/1/27.
 */
$(function () {

    var dd = new DropDown( $('#dd') );

    // $( '#cd-dropdown' ).dropdown( {
    //     gutter : 5,
    //     delay : 100,
    //     random : true
    // } );

    $(document).click(function() {
        // all dropdowns
        $('.wrapper-dropdown-1').removeClass('active');
    });
});

function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.rgb = '';
    this.initEvents();
}
DropDown.prototype = {
    initEvents : function() {
        var obj = this;

        obj.dd.on('click', function(event){
            $(this).toggleClass('active');
            return false;
        });

        obj.opts.on('click',function(){
            var opt = $(this);
            obj.rgb = opt.css('background-color');
            dropColor.init(obj);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
        });
    },
    getValText : function() {
        return this.val;
    },
    getIndex : function() {
        return this.index;
    },
    getRgb :function () {
        return this.rgb;
    }
};

dropColor = {
    $color : $('.one-color'),
    $bgColor : $('.one-bg-color'),
    $genderId : $('#gender'),
    initColor : function (obj) {
        dropColor.$color.css('border-color',obj.getRgb());
        dropColor.$bgColor.css('background-color',obj.getRgb());
        dropColor.$genderId.val(obj.getIndex());
    },
    initSelColorFn : function (obj) {
        var $temp = $('#style_css_id');
        if($temp.length >0){
            $temp.remove();
        }
        var $style = $('<style id="style_css_id">.cd-active.cd-dropdown > span{color:'+obj.getRgb()+'}' +
            '.cd-active.cd-dropdown ul li span:hover{background:'+obj.getRgb()+'}</style>');
        $('head').append($style);
    },
    init : function (obj) {
        dropColor.initColor(obj);
        dropColor.initSelColorFn(obj);
    }
};