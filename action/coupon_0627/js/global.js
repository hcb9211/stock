$.all = {
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
    pop : function(title){
        if(title){
            $('#line').html(title);
            $('#layer').addClass('show');
        }
    }
}