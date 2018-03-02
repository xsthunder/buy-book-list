/**
 *   For
 *   Created by xs at 2018/3/2
 */
"use strict";

(function () {
    angular.module('app')
        .factory('urlCnst', fn);

    function fn($http) {
        var self = {};
        //self.baseUrl = 'http://139.224.114.96:8080/dilitter/';
        self.baseUrl='';
        self.get = function (url, cb) {
            $http.get(self.baseUrl + url)
                .then(function (res) {
                    if(res.err){
                        cb(res);
                    }
                    return cb(null, res.data);
                }, function (err) {
                    cb(err);
                });
        };
        self.post = function (url, obj, cb) {
            var pl = new FormData();
            for (var i in obj) {
                pl.append(i, obj[i]);
            }
            $http.post(self.baseUrl + url, obj, {
                url: url+ '/' + url,
                method: 'POST',
                data: pl,
                headers: {'Content-Type': undefined}
            }).then(function (res) {
                if(res.data.err){
                    cb(res.data);
                }
                else cb(null, res.data);
            }, function (err) {
                cb(err);
            })
        };
        return self;
    }
})();
