chrome.contextMenus.create({

    type: 'normal',
    title: 'Add to RRUP',
    documentUrlPatterns: [
        "http://*/*",
        "https://*/*"
    ],
    onclick: function (info, tab) {
        var title = tab.title;
        var url = tab.url;

        chrome.windows.create({
            url: 'popup.html?title=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url),
            width: 500,
            height: 220,
            type: 'popup'
        }, function (resp) {
            console.log('window info >>>', resp);
        });
    }

}, function (err) {
    console.log('err >>>', err);
});

