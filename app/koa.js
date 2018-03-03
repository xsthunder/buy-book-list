/**
 *   For
 *   Created by xs at 2018/3/2
 */
"use strict";
const Koa = require("koa");

const app = new Koa();
/**
 * return a good respond
 * @param msg
 * @param res
 */
app.context.good = function (msg, res) {
    let ans = {};
    ans['err'] = 0;
    ans['msg'] = msg;
    ans['res'] = res || {};
    this.body = ans;
};
/**
 * return a bad respond
 * @param msg
 * @param res is information for developing, only available during development, change it in configure.js
 */
app.context.bad = function (msg, res) {
    let ans = {};
    ans['res'] = (res && (res['message'] || res)) || {};
    ans['err'] = 1;
    ans['msg'] = msg;
    this.body = ans;
};

app.context.mongoose = require('./mongoose');

/**
 * TODO replace this with log4js
 * @param msg
 */
app.context.log = function (msg) {
    console.log(msg);
};
app.context.err = function (msg) {
    console.error(msg);
};
app.context.debug = function (msg) {
    if (app.env === 'development') console.log(msg);
};
app.context.wait = function () {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve();
        }, 2000);
    }));
};


app.context.match = function (id, name) {
    const nameA =
        `曾健骏
王懿鸣
付杰
严婷
吴乔民
刘燕
李增鹏
刘祥栋
吴鑫
王颢达
谭璐洋
姚义
张丰原
龙虓
吴文斌
鲍骏韬
刘俊杰
杨骁
宋丹阳
王鹏
王笑天
桂翔
王禹博
洪伟祺
劳泽宇
付家林
罗进
黄江涛
姚素杰
宋景涛
陈楷文
陈星`.split('\n');
    const idA = `10150870
10153152
10153153
10153154
10153155
10153156
10153157
10153158
10153159
10153160
10153161
10153162
10153163
10153164
10153165
10153166
10153167
10153168
10153169
10153170
10153171
10153172
10153341
12150069
12150070
12150071
12150072
12150073
12150074
12150075
12150076
12150078`.split('\n');
    for(let i = 0;i<nameA.length;i++){
        if(nameA[i] === name){
            return(idA[i] === id);
        }
    }
    return false;
};
const bookName =
    "软件工程 操作系统 计算机网络 数字系统设计 数据仓库与数据挖掘 计算机图像处理 电子商务 编译原理 作业本(20本)".split(' ');
const bookPrice =
    "891 351 405 522 711 711 441 441 180".split(' ');
app.context.books = function () {
    return bookName;
};
app.context.price = function (name) {
    let i = 0;
    //console.log(bookName,bookPrice,name);
    for(i = 0;i<bookName.length;i++){
        if(bookName[i] === name)return bookPrice[i];
    }
    return '';
};

module.exports = app;
