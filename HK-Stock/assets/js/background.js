
var ls      = localStorage.getItem('code');
var code    = ls ? ls : '00434';
var api_url = 'https://jankerli.sinaapp.com/hk-stock/?code=' + code;

getStock();

setInterval(function () {

    var date = new Date();
    var hour = date.getHours();

    if (hour >= 9 && hour < 17) {
        getStock();
    }

}, 10 * 1000);

/**
 * 获取市场价格
 */
function getStock () {
    Ajax(api_url, {
        type: 'jsonp'
    }, function (resp) {

        chrome.browserAction.setBadgeText({
            text: resp.s_chengjiaojia
        });

        // doAlarm();

    });
}

/**
 * 价格提醒
 */
function doAlarm () {
    window.webkitNotifications.createNotification("assets/images/logo128x128.png", "HK Stock", "提醒文字").show();
}

/**
 * 基于原生的 JSONP 方法
 * @param  {String}   url     url 链接
 * @param  {Object}   cfg     如：{"type": "jsonp": "data": {}}
 * @param  {Function} success 成功回调函数
 */
function Ajax (url, cfg, success) {
    var op   = Object.prototype.toString;
    var doc  = document;
    var head = doc.getElementsByTagName('head')[0] || doc.head || doc.documentElement;

    if (op.call(cfg) === '[object Function]') {
        success = cfg;
        cfg = {};
    }
    var type = cfg.type || 'script',
        jsonpCallback = cfg.jsonpCallback || 'fn';
    jsonp = type == 'jsonp' ? (cfg.callbackName || 'callback') : '', data = cfg.data || '', dataToParam = function (data) {
        var ret = [],
            key, e = encodeURIComponent;
        for (key in data) {
            ret.push(key + '=' + e(data[key]));
        }
        return ret.join('&');
    }, url = url + (/\?/.test(url) ? '&' : (jsonp || data) ? '?' : '') + (jsonp ? (jsonp + '=' + jsonpCallback) : '') + (data ? '&' + dataToParam(data) : '');
    loadScript = function (url, callback) {
        var script = doc.createElement("script");
        script.type = "text/javascript";
        script.charset = "utf-8";
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (/loaded|complete/i.test(script.readyState)) {
                    script.onreadystatechange = null;
                    callback && callback.call(this);
                }
            };
        } else { //Others
            script.onload = function () {
                callback && callback.call(this);
            };
        }
        script.src = url;
        head.insertBefore(script, head.firstChild);
    }, removeScript = function () {
        var arg = arguments,
            script = arg[0],
            jsonpCallback = arg[1],
            type = Object.prototype.toString;
        //移除脚本
        if (script && /script/i.test(script.tagName)) {
            script.parentNode.removeChild(script);
        }
        //移除回调
        if (jsonpCallback && type.call(jsonpCallback) === '[object String]') {
            window[jsonpCallback] = null;
        }
        success();
    };
    var callback = window[jsonpCallback] = success;
    loadScript(url, function () {
        removeScript(this, jsonpCallback);
    });
}
