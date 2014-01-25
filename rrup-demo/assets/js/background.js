// 创建右键菜单 api 接口
chrome.contextMenus.create({

    type: 'normal', // 显示类型："normal", "checkbox", "radio", "separator"
    title: 'Add to RRUP', // 右键菜单项的显示文字
    // 使得右键菜单只在匹配此模式的url页面上生效
    documentUrlPatterns: [
        "http://*/*",
        "https://*/*"
    ],
    onclick: function (info, tab) {
        // 在点击事件中获取当前标签页的标题和链接信息
        var title = tab.title;
        var url = tab.url;

        // 创建一个新窗口并加载 popup.html 页面，且附带标题和链接参数内容
        chrome.windows.create({
            // 打开窗口的加载的 url 地址
            url: 'popup.html?title=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url),
            width: 500, // 窗口宽度
            height: 120, // 窗口高度
            type: 'popup' // 窗口类型："normal", "popup"
        }, function () {});
    }

}, function () {});