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
    if(!body['who'] || !body['id'])return ctx.bad('missing field who or id');
    if(!ctx.match(body['id'],body['who']))return ctx.bad('name and id do not match');
    try{
        let res = await Person.findOne({
            'who':body['who']
        }).exec();
        if(res){
            return ctx.bad(`deal with name '${body['who']}' exists`);
        }
        let list = [];
        for(let i = 0;i<body['list'].length;i++){
            let p = body['list'][i]['price'];
            let n= body['list'][i]['name'];
            let b = body['list'][i]['yes'];
            console.log(b,p,ctx.price(n),n);
            if(b && p === ctx.price(n) && ctx.price(n)) {
                list.push({
                    name: n,
                    price: p
                })
            }
        }
        let person = await new Person( Person.newInstance({
            'who':body['who'],
            'list':list
            } ) );
        res = await person.save();
        ctx.good('saved',res);
    }catch (err){
        console.log(err);
        return ctx.bad('server wrong, err',err);
    }
});

router.get('/',async(ctx)=>{
    let Person = ctx.mongoose.model('Person');
    try{
        let list = await Person.find().exec();
        let ans = {};
        ans.tol = 0;
        ctx.books().forEach((o)=>{
            ans[o] = 0;
        });
        list.forEach( (o) =>{
            ans.tol += o.tol;
            o.list.forEach( (n)=>{
                if(!ans.hasOwnProperty(n))return;
                ans[n]++;
            });
        });
        ctx.good(null,ans);
    }
    catch (err){
        return ctx.bad('server err',err);
    }
});

module.exports = router;
