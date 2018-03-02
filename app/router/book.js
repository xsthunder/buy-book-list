/**
 *   For
 *   Created by xs at 2018/3/2
 */
"use strict";
const Router = require('koa-router');

const router = Router();

router.post('/',async (ctx)=>{
    let body = ctx.request.body;
    const log = console.log;
    body = JSON.parse(body);
    let Person = ctx.mongoose.model('Person');
    if(!body['who'])return ctx.bad('missing field who');
    try{
        let res = await Person.findOne({
            'who':body['who']
        }).exec();
        if(res){
            return ctx.bad('name exists');
        }
        let person = await new Person( Person.newInstance(body) );
        res = await person.save();
        ctx.good('saved',res);
    }catch (err){
        console.log(err);
        return ctx.bad('server wrong, err',err);
    }
});


module.exports = router;
