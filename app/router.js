/**
 *   For
 *   Created by xs at 2018/3/2
 */
"use strict";

// mount global router

const Router = require('koa-router');
const router = new Router();

/**
 * COR controls
 */
router.options('/*',(ctx)=>{
    ctx.set('Access-Control-Allow-Headers','Content-Type');
ctx.set('Access-Control-Allow-Origin','*');
ctx.body = '';
});


router.use('/*',async(ctx,next)=>{
    ctx.set('Access-Control-Allow-Headers','Content-Type');
    ctx.set('Access-Control-Allow-Origin','*');
    // ctx.debug(JSON.stringify(ctx.request));
    let req = ctx.request;
    // ctx.debug(req);
    ctx.debug([Date(),'--->',req.method,req.url,req.header.host,req['user-agent'],JSON.stringify(req.body)].toString());
// ctx.debug(ctx.request.body);
    await next();
});

;
router.use('/get-book-list', require('./router/get-book-list').routes());
router.use('/book',require('./router/book').routes());
router.use('/person',require('./router/person').routes());
// router.use('/login',require('./router/login').routes());
// router.use('/register',require('./router/register').routes());
// router.use('/admin-user',require('./router/admin-user').routes());
// router.use('/admin-consultant',require('./router/admin-consultant').routes());
// router.use('/admin-essay',require('./router/admin-essay').routes());
//router.use('/login', require('./router/login').routes);

module.exports = router;
