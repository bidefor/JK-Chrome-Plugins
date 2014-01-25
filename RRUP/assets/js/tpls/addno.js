define(function (require) {
    var helpers = require('./$helpers');
    var Render = function ($data) {
            'use strict';
            var $helpers = this,
                $out = '';
            $out += '<p>please login!</p> <a href="##" class="btn btn-primary confirm">Confirm</a> ';
            return new String($out)
        };
    Render.prototype = helpers;
    return function (data) {
        return new Render(data) + '';
    }
})