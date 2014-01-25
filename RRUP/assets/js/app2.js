
var App = {

    Modles: {},
    Views: {},
    Collections: {},
    Router: {},

    init: function () {

        if ( GLOBAL.user_info ) {
            // is logined
            var url = window.location.href;
            var o = Utils.url2obj(url);
            var title = o.title;
            var url = o.url;
            var user_info = JSON.parse( GLOBAL.user_info );

            console.log(title);
            console.log(url);

            var view = new App.Views.AddUrlSucc();
            view.render(title, url, user_info.id);
        } else {
            // not login
            new App.Views.AddUrlNotLogin();
        }

    }

};

$( _.bind(App.init, App) );
