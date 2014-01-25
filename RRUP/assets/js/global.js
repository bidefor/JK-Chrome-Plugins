
(function (win) {

    win.GLOBAL = {
        user_info: localStorage.getItem('rrup_user_info') ? localStorage.getItem('rrup_user_info') : '',
        loading: '<img src="assets/images/loading-s.gif" />'
    };

})(window);
