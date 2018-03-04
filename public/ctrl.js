/**
 *   For
 *   Created by xs at 2018/3/2
 */
"use strict";
(function () {
    var app = angular.module('app',[]);
    app.controller('AppCtrl',fnList);
    function fnList($http,$scope,urlCnst) {
        var log = console.log;
        var bookName = [];
        urlCnst.get('get-book-list',function (err,res) {
            log(res,err);
            $scope.list = res.res.list;
            var i = 0;
            for(i = 0;i<$scope.list.length;i++){
                bookName.push($scope.list[i].name);
            }
        });
        $scope.who = '';
        $scope.tol = 0;
        $scope.insert = function (s) {
            s = s+'';
            var l = s.length;
            if(l<=1)return s;
            return s.substr(0,l-1)+'.'+s.substr(l-1);
        };
        $scope.post = function () {
            if(!$scope.who||!$scope.id)return alert('who are you?');
            urlCnst.post('book',{
                who:$scope.who,
                id:$scope.id,
                list:$scope.list
            },function (err,res) {
                $scope.msg = (err?"FAILED":"SUCCEEDED") +' '+ Date();
                if(err){
                    $scope.msg += JSON.stringify(err);
                }
                else $scope.msg += JSON.stringify(res);
                $scope.getAllInfo();
            })
        }
        $scope.check = function () {
            function fn() {
                var i = 0;
                $scope.tol = 0;
                for(i = 0;i<$scope.list.length;i++){
                    if($scope.list[i]['yes'])$scope.tol += Number.parseInt($scope.list[i]['price']);
                }
            }
            fn();
        }
        $scope.getAllInfo = function () {
            $scope.allInfo = [];
            urlCnst.get('person',function (err,res) {
                if(err)return alert(err);
                var list = bookName;
                var res = res.res;
                var i = 0;
                var j = 0;
                console.log(list);
                for(i = 0;i<res.length;i++){
                    var now = res[i];
                    now.nlist = [];
                    console.log(now);
                    for(j = 0;j<list.length;j++){

                        var tmp = now.list.includes(list[j]);
                        now.nlist.push(tmp?1:0)
                    }
                }
                $scope.allInfo = res;
                console.log(res);
            })
        };
        $scope.getBookSum= function () {
            urlCnst.get('book',function (err,res) {
                if(err)return alert(err);
                $scope.sumBook = res.res;
            })
        }
    }

})();
