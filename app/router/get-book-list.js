/**
 *   For
 *   Created by xs at 2018/3/2
 */
"use strict";
const Router = require('koa-router');

const router = Router();

const bookName =
    "软件工程 操作系统 计算机网络 数字系统设计 数据仓库与数据挖掘 计算机图像处理 电子商务 编译原理 作业本(20本)";
const bookPrice =
    "891 351 405 522 711 711 441 441 180";

let getBookList = function () {
    let fn = function (nlist,plist) {
        let a = [];
        for(let i = 0;i<nlist.length&&i<plist.length;i++){
            a.push({
                "name":nlist[i],
                "price":plist[i],
                "yes":false
            })
        }
        return a;
    }
    let bookList = fn(bookName.split(' '),bookPrice.split(' '));
    return bookList;
}

router.get('/', async (ctx) => {
    ctx.good("",{
        "who":'null',
        "list":getBookList()
    }
);
}) ;

module.exports = router;



