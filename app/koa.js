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
        `xsthunder`.split('\n');
    const idA = `1001`.split('\n');
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
