App.Router = Backbone.Router.extend({

    routes: {
        '!/login': 'login',
        '!/signup': 'signup',
        '!/main': 'main',
        '!/page/:pid': 'page',
        '!/tagpage/:tagname/:pid': 'tagpage',
        '!/srchTag/:tagname': 'srchTag'
    },

    login: function () {
        new App.Views.Login();
    },

    signup: function () {
        new App.Views.SignUp();
    },

    main: function () {
        var o = {
            pageid: 1,
            tagname: null
        };
        var view = new App.Views.Main();
        view.render(o);
    },

    page: function (pid) {
        var o = {
            pageid: pid,
            tagname: null
        };
        var view = new App.Views.Main();
        view.render(o);
    },

    tagpage: function (tagname, pid) {
        var o = {
            pageid: pid,
            tagname: tagname
        };
        var view = new App.Views.Main();
        view.render(o);
    },

    srchTag: function (tagname) {
        var o = {
            pageid: 1,
            tagname: tagname
        };
        var view = new App.Views.Main();
        view.render(o);
    }

});
