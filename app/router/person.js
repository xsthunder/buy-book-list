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

router.post('/',async(ctx)=>{
    let body = ctx.request.body.fields;

    if(body['asdfpv[12vblka;1'] !== 'asdf[v]wqael,23.,vf')return ctx.bad('not allowed');
    if(!body['who'])return ctx.bad('missing field');
    let Person = ctx.mongoose.model('Person');
    try{
        // console.log(body['who']);
        let ans = await Person.findOne({
            who:body['who']
        }).exec();
        // console.log(ans);
        if(!ans)return ctx.bad(`deal with name ${body['who']} not exits`);
        ans = await ans.pay().save();
        ctx.good(null,ans);
    }catch (err){
        ctx.bad(null,err);
    }
});

module.exports = router;
