/**
 *   For
 *   Created by xs at 2018/3/2
 */
"use strict";
const Koa = require("koa");

const app =new Koa();
/**
 * return a good respond
 * @param msg
 * @param res
 */
app.context.good = function(msg,res){
    let ans = {};
    ans['err'] = 0;
    ans['msg'] = msg;
    ans['res'] = res||{};
    this.body = ans;
};
/**
 * return a bad respond
 * @param msg
 * @param res is information for developing, only available during development, change it in configure.js
 */
app.context.bad= function(msg,res){
    let ans = {};
    ans['res'] = (res&&(res['message']||res))||{};
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
app.context.debug= function (msg) {
    if(app.env==='development')console.log(msg);
};
app.context.wait = function () {
    return new Promise((resolve=>{
        setTimeout(()=>{
        resolve();
},2000);
}));
};

module.exports = app;
