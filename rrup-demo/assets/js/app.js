document.getElementById('addUrl').onclick = function () {
    chrome.tabs.query({
        active: true, // 标签页是否是激活状态
        currentWindow: true // 标签页是否在当前窗口
    }, function (tabs) {
        // 在控制台打印 tabs 中包含的信息
        console.log(tabs);
        var title = tabs[0].title;
        var url   = tabs[0].url;
        console.log('网页标题：' + title);
        console.log('网页链接：' + url);

        // 显示内容到 index.html 页面中
        document.getElementById('show').innerHTML = '网页标题：' + title + '<br> 网页链接：' + url;
    });
};