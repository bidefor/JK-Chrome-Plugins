var App = {

    Modles: {},
    Views: {},
    Collections: {},
    Router: {},

    init: function () {

        this.initRouter();

        if ( GLOBAL.user_info ) {
            App.router.navigate('!/main', true);
        } else {
            App.router.navigate('!/login', true);
        }
    },

    initRouter: function () {
        App.router = new App.Router();
        Backbone.history.start();
    }

};

$( _.bind(App.init, App) );
