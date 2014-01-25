
window.Utils = {

    // 对象转换成请求字串
    toParam: function(obj) {
        var result = [];
        for(var key in obj){
            result.push(key + '=' + obj[key]);
        }
        return result.join('&');
    },

    url2obj : function(url){
        var arr = (url?url:document.location.search).split("?");
        var obj = {};
        if(arr.length>1){
            var arr2 = arr[1].split("&");
            var len = arr2.length;
            for(var i=0;i<len;i++){
                var arr3 = arr2[i].split("=");
                if(arr3[0]!=='' && arr3[1] !== ''){
                   obj[arr3[0]] = decodeURI(arr3[1]);
                }
            }
        }
        return obj;
    }

};
