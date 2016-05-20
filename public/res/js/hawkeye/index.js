define(function(require, exports, module) {

    template.helper('numToPercent', function (number) {
        return (number*100).toFixed(2)
    });

    template.helper('shortDate', function (date) {
        return date.substring(4,6) + '.' + date.substring(6);
    });

    var Action = {
        bindEvent : function(){
            $('body').delegate('.js-tap', $.Func.TAP, function(e){
                var handler = $(this).data('handler');
                Action[handler] && Action[handler].call(this);
            })
        },
        //鹰眼播报
        getEye: function(){
            var that = this;
            var param = {
                "jsonrpc": "2.0",
                "method": "EagleEyes.Broadcast",
                "id": 54321,
                "params" : {
                }
            };
            $.Func.ajax(param, function(data){
                var result = data.result;
                var date = result.day.toString();

                //日期
                result.newDate = date.substring(0, 4) + '年' +  date.substring(4, 6) + '月' +  date.substring(6) + '日';
                var html = template('broadcast-template', result);
                $('#broadcast').html(html);
                that.getHistory(date);
            })
        },
        //播报历史记录
        getHistory: function(date){
            var param = {
                "jsonrpc": "2.0",
                "method": "EagleEyes.BroadcastHistory",
                "id": 54321,
                "params" : {
                    "date":date,
                    "count": 9
                }
            };
            $.Func.ajax(param, function(data){
                var result = data.result;
                var html = template('probability-template', result);
                $('#probability').html(html);
            })
        },
        //板块股票
        getBlockStock: function(date){
            var param = {
                "jsonrpc": "2.0",
                "method": "EagleEyes.BlockStock",
                "id": 54321,
                "params" : {
                    "blockid": 885734
                }
            };
            $.Func.ajax(param, function(data){
                var result = data.result;
                console.log(result);
            })
        },
        //板块
        getBlock: function(){
            var param = {
                "jsonrpc": "2.0",
                "method": "EagleEyes.Block",
                "id": 54321,
                "params" : {
                }
            };
            $.Func.ajax(param, function(data){
                var result = data.result;
                result.colors = ['bg-blue', 'bg-pink', 'bg-yellow', 'bg-blue', 'bg-pink', 'bg-yellow'];
                var html = template('block-template', result);
                $('#block').html(html);
            })
        },
        init : function(){
            this.bindEvent();
            this.getEye();
            this.getBlock();
            //this.getBlockStock();
        }
    }

    module.exports = Action;
});