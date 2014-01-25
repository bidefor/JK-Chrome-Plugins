/**
 * Login View
 */
App.Views.Login = Backbone.View.extend({

    className: 'login',

    events: {
        'keyup #inputUsername': 'chkUsr',
        'keyup #inputPassword': 'chkPwd',
        'click #submit': 'chkLogin'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        var self = this;

        require(['./assets/js/tpls/login'], function (login) {
            var _tpl = login();
            var _html = $(self.el).html( _tpl );
            $('#app').html( _html );
        });

    },

    // check username
    chkUsr: function () {
        var ipt = $('#inputUsername');
        var val = ipt.val();

        if (val) {
            ipt.siblings('p').text('');
        }
    },

    // check password
    chkPwd: function () {
        var ipt = $('#inputPassword');
        var val = ipt.val();

        if (val) {
            ipt.siblings('p').text('');
        }
    },

    // check login
    chkLogin: function (e) {
        e.preventDefault();

        var btn = $('#submit');
        var username = $('#inputUsername').val();
        var password = $('#inputPassword').val();

        if (!username) {
            $('#inputUsername').siblings('p').text('Username can not be empty!');
            return;
        }

        if (!password) {
            $('#inputPassword').siblings('p').text('Password can not be empty!');
            return;
        }

        var params = {
            action: 'login',
            username: username,
            password: password
        };

        $('#loading').show();

        Api(Utils.toParam(params), function (resp) {
            // console.log(resp);
            if ( resp == null ) {
                // login fail
                btn.siblings('p').text('Oh... name or pass is wrong?');
            } else {
                // login success
                localStorage.setItem('rrup_user_info', JSON.stringify(resp[0]));
                App.router.navigate('!/main', true);
            }
            $('#loading').hide();
        }, function (err) {
            // console.log(err);
        });
    }

});


/**
 * Sign Up View
 */
App.Views.SignUp = Backbone.View.extend({

    className: 'signup',

    events: {
        'keyup #inputUsername': 'chkUsr',
        'keyup #inputPassword': 'chkPwd',
        'click #submit': 'chkSignup'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        var self = this;

        require(['./assets/js/tpls/register'], function (register) {
            var _tpl = register();
            var _html = $(self.el).html( _tpl );
            $('#app').html( _html );
        });
    },

    // check username
    chkUsr: function () {
        var ipt = $('#inputUsername');
        var val = ipt.val();

        if (val) {
            ipt.siblings('p').text('');
        }
    },

    // check password
    chkPwd: function () {
        var ipt = $('#inputPassword');
        var val = ipt.val();

        if (val) {
            ipt.siblings('p').text('');
        }
    },

    // check sign up
    chkSignup: function (e) {
        e.preventDefault();

        var btn = $('#submit');
        var username = $('#inputUsername').val();
        var password = $('#inputPassword').val();

        if (!username) {
            $('#inputUsername').siblings('p').text('Username can not be empty!');
            return;
        }

        if (!password) {
            $('#inputPassword').siblings('p').text('Password can not be empty!');
            return;
        }

        var params = {
            action: 'signup',
            username: username,
            password: password
        };

        $('#loading').show();

        Api(Utils.toParam(params), function (resp) {
            // console.log(resp);
            // null can register
            if ( resp.username ) {
                // the username is exist
                btn.siblings('p').addClass('red').html('Oh... the username has been registered.');
            } else {
                // sign up success
                btn.siblings('p').addClass('green').html('Congratulation! Successful registration. <a href="#!/login">Go back to login.</a>');
            }
            $('#loading').hide();
        }, function (err) {
            // console.log(err);
        });
    }

});


/**
 * Main View
 */
App.Views.Main = Backbone.View.extend({

    className: 'main',

    isSave: false,

    events: {
        'click #btn-add': 'addUrl',
        'click .delete': 'delUrl',
        'click .logout': 'logout',
        'click .add_tag': 'addTag',
        'click .del_tag': 'delTag',
        'keydown .ipt_add_tag': 'saveTag',
        'blur .ipt_add_tag': 'unSaveTag'
    },

    render: function (obj) {
        $('#loading').show();
        var self = this;
        var user_info = JSON.parse( localStorage.getItem('rrup_user_info') );
        var params = {
            action: 'show',
            page: obj.pageid,
            tagname: obj.tagname,
            user_id: user_info.id
        };

        // get the datas, by default, get the first page of data.
        Api(Utils.toParam(params), function (resp) {
            console.log(resp);
            if ( resp == null ) {
                // get data fail
            } else {
                // get data success

                user_info.records = resp.len;
                var data = {
                    list: resp.data,
                    user_info: user_info
                };

                require(['./assets/js/tpls/main'], function (main) {
                    var _tpl = main(data);
                    var _html = $(self.el).html( _tpl );
                    $('#app').html( _html );

                    var pages = Math.ceil(resp.len/12);
                    var htmlPages = '';
                    page = parseInt(obj.pageid);
                    if (obj.tagname == null) {
                        if ( page == 1 ) {
                            if ( page == pages ) {
                                htmlPages = '<li class="disabled"><a href="#"><<</a></li><li class="disabled"><a href="#">>></a></li>';
                            } else {
                                htmlPages = '<li class="disabled"><a href="#"><<</a></li><li><a href="#!/page/'+ (page+1) +'">>></a></li>';
                            }

                        } else if ( page == pages ) {
                            htmlPages = '<li><a href="#!/page/'+ (page-1) +'"><<</a></li><li class="disabled"><a href="#">>></a></li>';
                        } else {
                            htmlPages = '<li><a href="#!/page/'+ (page-1) +'"><<</a></li><li><a href="#!/page/'+ (page+1) +'">>></a></li>';
                        }
                    } else {
                        if ( page == 1 ) {
                            if ( page == pages ) {
                                htmlPages = '<li class="disabled"><a href="#"><<</a></li><li class="disabled"><a href="#">>></a></li>';
                            } else {
                                htmlPages = '<li class="disabled"><a href="#"><<</a></li><li><a href="#!/tagpage/'+ obj.tagname + '/' + (page+1) +'">>></a></li>';
                            }

                        } else if ( page == pages ) {
                            htmlPages = '<li><a href="#!/tagpage/'+ obj.tagname + '/' + (page-1) +'"><<</a></li><li class="disabled"><a href="#">>></a></li>';
                        } else {
                            htmlPages = '<li><a href="#!/tagpage/'+ obj.tagname + '/' + (page-1) +'"><<</a></li><li><a href="#!/tagpage/'+ obj.tagname + '/' + (page+1) +'">>></a></li>';
                        }
                    }



                    $('.pagination').html(htmlPages);
                });


            }
            $('#loading').hide();

        }, function (err) {
            // console.log(err);
        });
    },

    // add url record
    addUrl: function () {
        $('#loading').show();
        var self = this;

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            var tab = tabs[0];
            var user_info = JSON.parse( localStorage.getItem('rrup_user_info') );
            var user_id = user_info.id;

            var params = {
                action: 'add',
                user_id: user_id,
                title: encodeURIComponent(tab.title),
                url: encodeURIComponent(tab.url)
            };

            Api(Utils.toParam(params), function (resp) {
                // console.log(resp);
                if (resp) {
                    App.router.navigate('!/main', true);
                }

            }, function (err) {
                // console.log(err);
            });
        });
    },

    // delete url record
    delUrl: function (e) {
        $('#loading').show();
        var handle = $(e.target);
        var id = handle.data('id');
        var user_info = JSON.parse( localStorage.getItem('rrup_user_info') );
        var user_id = user_info.id;

        var params = {
            action: 'del',
            id: id,
            user_id: user_id
        };

        Api(Utils.toParam(params), function (resp) {
            // console.log(resp);
            if (resp) {
                App.router.navigate('!/main', true);
            }
        }, function (err) {
            // console.log(err);
        })

    },

    // login out
    logout: function () {
        localStorage.removeItem('rrup_user_info');
        App.router.navigate('!/login', true);
    },

    // add tag
    addTag: function (e) {
        var me = $(e.target);
        var ipt = me.siblings('.ipt_add_tag');
        me.hide();
        ipt.val('').show().focus();
    },

    // save tag
    saveTag: function (e) {
        var me = $(e.target);
        var btnAdd = me.siblings('.add_tag');
        var loading = me.siblings('.iloading');
        var tags = me.siblings('.tags');
        var record_id = btnAdd.data('id');
        var tag_name = me.val();

        if (e.keyCode == 13) {

            if (tag_name) {
                this.isSave = true;

                loading.show();

                var user_info = JSON.parse( localStorage.getItem('rrup_user_info') );
                var user_id = user_info.id;
                var params = {
                    action: 'addTag',
                    user_id: user_id,
                    record_id: record_id,
                    tag_name: encodeURIComponent(tag_name)
                };

                Api(Utils.toParam(params), function (resp) {
                    console.log(resp);
                    if (resp) {
                        tags.find('a').attr('href', '#!/srchTag/'+tag_name).text(tag_name);;
                        tags.show().siblings().hide();
                    }
                }, function (err) {
                    // console.log(err);
                    loading.hide();
                    me.hide();
                });
            } else {
                me.hide();
                btnAdd.show();
            }

        }

    },

    // unsave tag
    unSaveTag: function (e) {
        if ( !this.isSave ) {
            var me = $(e.target);
            var btnAdd = me.siblings('.add_tag');
            var val = me.val();
            me.hide();
            btnAdd.show();
        }
    },

    // del tag
    delTag: function (e) {
        var isDel = window.confirm('Are you sure to del this tag?');
        if (isDel) {
            var me = $(e.target);
            var tags = me.parent().parent();
            var loading = tags.siblings('.iloading');
            var btnAdd = tags.siblings('.add_tag');
            var ipt = tags.siblings('.ipt_add_tag');
            var rid = btnAdd.data('id');

            var user_info = JSON.parse( localStorage.getItem('rrup_user_info') );
            var user_id = user_info.id;
            var params = {
                action: 'delTag',
                user_id: user_id,
                rid: rid
            };

            Api(Utils.toParam(params), function (resp) {
                console.log(resp);
                if (resp) {
                    me.siblings('a').attr('href', '#').text('');
                    tags.hide();
                    btnAdd.show();
                }
            }, function (err) {
                // console.log(err);
                loading.hide();
                me.hide();
            });


        }
    }

});


/**
 * Add Url, but not login
 */
App.Views.AddUrlNotLogin = Backbone.View.extend({

    className: 'addno',

    events: {
        'click .confirm': 'confirm'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        $('#loading').show();
        var self = this;

        require(['./assets/js/tpls/addno'], function (addno) {
            var _tpl = addno();
            var _html = $(self.el).html( _tpl );
            $('.add_box').html( _html );
            $('#loading').hide();
        });

    },

    confirm: function () {
        window.close();
    }

});


/**
 * Add Url, and success
 */
App.Views.AddUrlSucc = Backbone.View.extend({

    className: 'addyes',

    events: {
        'click .confirm': 'confirm'
    },

    render: function (title, url, user_id) {
        $('#loading').show();

        var self = this;

        var params = {
            action: 'add',
            user_id: user_id,
            title: title,
            url: url
        };

        Api(Utils.toParam(params), function (resp) {
            // console.log(resp);
            if (resp) {
                require(['./assets/js/tpls/addyes'], function (addyes) {
                    var _tpl = addyes();
                    var _html = $(self.el).html( _tpl );
                    $('.add_box').html( _html );
                });
            }
            $('#loading').hide();
        }, function (err) {
            // console.log(err);
            $('#loading').hide();
        });

    },

    confirm: function () {
        window.close();
    }

});
