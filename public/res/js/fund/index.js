define(function(require, exports, module) {

    //var Template = require('../libs/template');
    template.helper('numToPercent', function (number) {
        return (number*100).toFixed(2) + '%'
    });

    template.helper('dateFormate', function (createdate) {
        var date = createdate.substring(0, 10).split('-');
        return date[0] + '.' + date[1] + '.' + date[2];
    });

    var Action = {
        bindEvent : function(){
            $('body').delegate('.js-tap', 'click', function(e){
                var handler = $(this).data('handler');
                Action[handler] && Action[handler].call(this);
            })
        },
        showMore : function(e){
            var $parent = $(this).parent();
            if($parent.hasClass('on')){
                $parent.removeClass('on');
            }else{
                $parent.addClass('on');
            }
        },
        //渲染页面
        renderPage : function(){
            var param = {
                "jsonrpc": "2.0",
                "method": "Fund.FundList",
                "id": 54321,
                "params" : {
                    "blockid": 885494
                }
            };
            $.Func.ajax(param, function(data){
                var result = data.result;
                //console.log(result);
                var html = template('li-template', result);
                $('#fundlist').html(html);
            })
        },
        init : function(){
            this.renderPage();
            this.bindEvent();
            $.Func.showLayer('#popBindAccount');
        }
    }

    module.exports = Action;
});