define(function (require) {
    var helpers = require('./$helpers');
    var Render = function ($data) {
            'use strict';
            var $helpers = this,
                $out = '';
            $out += '<h3 class="text-center">Login Form</h3> <form class="form-horizontal"> <div class="form-group"> <label for="inputUsername" class="col-lg-2 control-label">Username: </label> <div class="col-lg-10"> <input type="text" class="form-control" id="inputUsername" placeholder="Username"> </div> </div> <div class="form-group"> <label for="inputPassword" class="col-lg-2 control-label">Password: </label> <div class="col-lg-10"> <input type="password" class="form-control" id="inputPassword" placeholder="Password"> </div> </div> <div class="form-group"> <div class="col-lg-offset-2 col-lg-10"> <button type="submit" class="btn btn-primary" id="submit">Login</button> <a href="#!/signup">Register</a> <p class="red tips"></p> </div> </div> </form> ';
            return new String($out)
        };
    Render.prototype = helpers;
    return function (data) {
        return new Render(data) + '';
    }
})