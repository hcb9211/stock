define(function(require, exports, module) {
    //=> 加载的是 path/to/a-debug.js

    $.Func = {
        TAP : 'ontouchstart' in window ? 'tap' : 'click',
        getParam : function(param){
            var search = location.search.substring(1);
            var arr = search.split('&');
            for(var i=0,j=arr.length; i<j; i++){
                var arr1 = arr[i].split('=');
                if(arr1[0] == param){
                    return arr1[1];
                }
            }
        },
        ajax : function(param, fn){
            var url = 'http://app.api.gupiaoxianji.com/test';
            $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json",
                dataType : 'json',
                data: JSON.stringify(param),
                success: function(data){
                    fn && fn(data);
                }
            })
        },
        pop: function(title){
            if(title){
                $('#line').html(title);
                $('#layer').addClass('show');
            }
        },
        showLayer: function(id){
            $(id).addClass('show');
        },
        checkLogin: function(){
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
        }
    }



});