/**
 *   For
 *   Created by xs at 2018/3/2
 */
"use strict";

const Koa = require('koa');
const app = new Koa();
const serveStatic = require('koa-serve-static');
const router = require('./app/router.js');
const KoaBody = require('koa-body');



app.use(serveStatic('./public', {}));

app
    .use(KoaBody({
        multipart:true
    }))
    .use(router.routes());
//.use(router.allowedMethods());



app.listen(3000);