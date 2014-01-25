var Utils = {
    getTimeAgo: function () {
        var mSeconds = 1000 * 60 * 60 * 24 * 365 * 2;
        var times = (new Date()).getTime() - mSeconds;
        return times;
    }
};

var patterns = ["http://*/*", "https://*/*"];
var arr = [
    {name: 'AppCache', type: 'appcache'},
    {name: 'LocalStorage', type: 'localStorage'},
    {name: 'Cache', type: 'cache'},
    {name: 'Cookies', type: 'cookies'},
    {name: 'Downloads', type: 'downloads'},
    {name: 'FormData', type: 'formData'},
    {name: 'History', type: 'history'},
    {name: 'IndexedDB', type: 'indexedDB'},
    {name: 'Passwords', type: 'passwords'},
    {name: 'WebSQL', type: 'webSQL'}
];

for (var i = 0, len = arr.length; i < len; i++) {
    mapping(arr[i].name, arr[i].type);
}

function mapping (name, type) {
    var data = {type: true};
    var oTypes = {
        "appcache": false,
        "cache": false,
        "cookies": false,
        "downloads": false,
        "fileSystems": false,
        "formData": false,
        "history": false,
        "indexedDB": false,
        "localStorage": false,
        "serverBoundCertificates": false,
        "pluginData": false,
        "passwords": false,
        "webSQL": false
    };
    for (var i in oTypes) {
        if (i == type) oTypes[i] = true;
    }
    chrome.contextMenus.create({
        type: 'normal',
        title: 'Clear ' + name,
        contexts: ['all'],
        documentUrlPatterns: patterns,
        onclick: function () {

            chrome.browsingData.remove({
                'since': Utils.getTimeAgo()
            }, oTypes, function () {
                alert(name + ' 清理完成！');
            });

        }
    });
}
