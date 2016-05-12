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
    }
}