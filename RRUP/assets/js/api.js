
(function (win) {

    win.Api = function (params, sucCallback, errCallback) {
        $.ajax({
            type: 'GET',
            url: 'https://rrup.sinaapp.com/getData.php?' + params,
            dataType: 'jsonp',
            success: sucCallback,
            error: errCallback
        });
    };

})(window);
