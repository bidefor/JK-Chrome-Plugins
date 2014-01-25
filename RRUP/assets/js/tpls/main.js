define(function (require) {
    var helpers = require('./$helpers');
    var Render = function ($data) {
            'use strict';
            var $helpers = this,
                $escape = $helpers.$escape,
                $string = $helpers.$string,
                user_info = $data.user_info,
                list = $data.list,
                i = $data.i,
                k = $data.k,
                $out = '';
            $out += '<div class="topbar clearfix"> <div class="userinfo"> <strong>';
            $out += $escape($string(user_info.username));
            $out += '</strong><sup><a href="##" class="logout">Logout?</a></sup>, you have added <strong class="green">';
            $out += $escape($string(user_info.records));
            $out += '</strong> URL records. </div> <div class="abtn"> <a href="##" class="btn btn-primary" id="btn-add">Add Current Url</a> </div> </div> <div class="table_list"> <table class="table table-hover"> <thead> <tr> <th>#</th> <th>Title</th> </tr> </thead> <tbody> ';
            if (list) {
                $out += ' ';
                for (var i = 0, k = 1; i < list.length; i++, k++) {
                    $out += ' <tr class="single-data"> <td> <div class="lid"> ';
                    $out += $escape($string(k));
                    $out += ' </div> </td> <td> <div class="ltit"> <a href="';
                    $out += $escape($string(list[i].url));
                    $out += '" title="';
                    $out += $escape($string(list[i].title));
                    $out += '" target="_blank" class="title">';
                    $out += $escape($string(list[i].title));
                    $out += '</a> ';
                    if (list[i].tag_name == null) {
                        $out += ' <div class="unaddtag_box"> <a href="#" data-id="';
                        $out += $escape($string(list[i].id));
                        $out += '" class="add_tag">add tag</a> <input type="text" placeholder="add tag" class="ipt_add_tag" /> <img src="assets/images/loading-s.gif" class="iloading" /> <ul class="tags"> <li><a href="#">';
                        $out += $escape($string(list[i].tag_name));
                        $out += '</a><i class="del_tag">x</i></li> </ul> </div> ';
                    } else {
                        $out += ' <div class="addtag_box"> <a href="#" data-id="';
                        $out += $escape($string(list[i].id));
                        $out += '" class="add_tag">add tag</a> <input type="text" placeholder="add tag" class="ipt_add_tag" /> <img src="assets/images/loading-s.gif" class="iloading" /> <ul class="tags"> <li><a href="#!/srchTag/';
                        $out += $escape($string(list[i].tag_name));
                        $out += '">';
                        $out += $escape($string(list[i].tag_name));
                        $out += '</a><i class="del_tag">x</i></li> </ul> </div> ';
                    }
                    $out += ' <a href="##" data-id="';
                    $out += $escape($string(list[i].id));
                    $out += '" class="delete">Delete</a> </div> </td> </tr> ';
                }
                $out += ' ';
            } else {
                $out += ' <tr> <td colspan="4" align="center" style="text-align: center; font-weight: bold;">no data</td> </tr> ';
            }
            $out += ' </tbody> </table> ';
            if (list != null) {
                $out += ' <div class="pages"> <ul class="pagination"> </ul> </div> ';
            }
            $out += ' </div> <a href="#!/main" class="index">index</a> ';
            return new String($out)
        };
    Render.prototype = helpers;
    return function (data) {
        return new Render(data) + '';
    }
})