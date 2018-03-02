/**
 *   For
 *   Created by xs at 2018/3/2
 */
"use strict";

const app = require('./app/koa.js');

const serveStatic = require('koa-serve-static');
const router = require('./app/router.js');
const KoaBody = require('koa-body');

app
    .use(KoaBody({
        multipart:true
    }))
    .use(router.routes());

//.use(router.allowedMethods());
app.use(serveStatic('./public', {}));


app.listen(3000);