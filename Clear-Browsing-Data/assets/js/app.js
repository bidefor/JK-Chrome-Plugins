var Api = {

    BrowsingData: {

        remove: function (time, type, callback) {
            // refs: http://developer.chrome.com/extensions/browsingData.html
            chrome.browsingData.remove({
                "since": time
            }, type, callback);

        }

    }

};

var Utils = {

    getTimeAgo: function () {
        var mSeconds = 1000 * 60 * 60 * 24 * 365;
        var times = (new Date()).getTime() - mSeconds;

        return times;
    }

};

window.onload = function () {

    var txt_clearing = '清除数据中，请稍后...';
    var txt_cleardone = '清除成功啦！：）';
    var tips = document.getElementById('tips');
    var btns = document.querySelectorAll('.btn');

    for( var i = 0, len = btns.length; i < len; i++ ) {

        var btn = document.getElementById(btns[i].id);
        var type = btn.getAttribute('data-type');
        var str = '{"'+ type +'": true}';

        mapping(btn, type, str);

    }

    function mapping (btn, type, str) {

        btn.onclick = function () {

            var data = JSON.parse(str);
            tips.innerHTML = txt_clearing;

            Api.BrowsingData.remove(Utils.getTimeAgo(), data, function () {
                tips.innerHTML = type + ' ' + txt_cleardone;
            });

        };
    }

};
