/**
 *   For
 *   Created by xs at 2018/3/2
 */
"use strict";
const Router = require('koa-router');

const router = Router();

router.get('/',async(ctx)=>{
    let Person = ctx.mongoose.model('Person');
    try{
        let ans = await Person.find().exec();
        ctx.good(null,ans);
    }catch (err){
        ctx.bad(null,err);
    }
});

module.exports = router;
