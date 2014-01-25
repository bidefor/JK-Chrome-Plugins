/*
Todo:
1、添加按钮手动刷新
2、添加提醒功能
3、只在股票开始时间内刷新
 */
var App = {

    init: function () {
        var self = this;

        self.initLocalStorage();
        self.initBindIpt();
        self.doGetStock();

        this.timeId = setInterval(function () {
            self.doGetStock();
        }, 15*1000);
    },

    initLocalStorage: function () {
        var ls    = localStorage.getItem('code');
        this.code = ls ? ls : '00434';
    },

    initBindIpt: function () {
        var self = this;

        $('#code').on('keypress', function (e) {
            var val = $(this).val();

            if ( e.keyCode == 13 ) {
                if (!val) return;
                localStorage.setItem('code', val);
                self.code = val;
                self.doGetStock();
            }
        });
    },

    doGetStock: function () {
        $('#loading').show();
        $.get('https://jankerli.sinaapp.com/hk-stock/', {
            code: this.code
        }, function (resp) {
            console.log(resp);
            $('#loading').hide();
            if ( resp.result == 'false' ) {
                console.log('error....');
            } else {
                _.each(resp, function (val, key) {
                    $('#'+key).text(val);
                });
                chrome.browserAction.setBadgeText({
                    text: resp.s_chengjiaojia
                });
            }

        }, 'jsonp');
    }

};

$(_.bind(App.init, App));
