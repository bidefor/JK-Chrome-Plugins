var url   = window.location.href; // 获取由 background.js 打开新窗口时的 url 信息
var o 	  = url2obj(url); // 解析 url 链接，获取需要的网页标题和链接内容
var title = decodeURIComponent(o.title);
var url   = decodeURIComponent(o.url);

// 显示内容到新打开的窗口中
document.getElementById('popup').innerHTML = '网页标题：' + title + '<br>' + '网页链接：' + url;

// 解析 url 链接
function url2obj (url) {
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