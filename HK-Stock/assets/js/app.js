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
        }, 10*1000);

        $('#refresh').on('click', function () {
            self.doGetStock();
        });
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

        $('#max').on('blur', function () {
            var val = $('#max').val();
            if (val == '') return;
            if (!_.isNumber(val)) {
                console.log('请输入数字好不o(╯□╰)o');
                return;
            }
            localStorage.setItem('max', val);
            localStorage.setItem('isMaxAlarm', 0);
        });

        $('#min').on('blur', function () {
            var val = $('#min').val();
            if (val == '') return;
            if (_.isNumber(val)) {
                alert('请输入数字好不o(╯□╰)o');
                return;
            }
            localStorage.setItem('min', val);
            localStorage.setItem('isMinAlarm', 0);
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
    },

    doAlarm: function () {
        window.webkitNotifications.createNotification("assets/images/logo128x128.png", "HK Stock", "提醒文字").show();
    }

};

$(_.bind(App.init, App));
