/**
 *   For
 *   Created by xs at 2018/3/2
 */
"use strict";
const mongoose = require('mongoose');
let person= {
    who:{
        type:String,
        require:true
    },
    tol:Number,
    list:[String],
    payed:{
        type:Boolean,
        default:false
    },
    taken:{
        type:Boolean,
        default:false
    }
};

let schema= mongoose.Schema(person);

schema.statics.newInstance = function (body) {
    // TODO check field
    let tmp = {};
    tmp.who = body['who'];
    tmp.tol = 0;
    tmp.list=[];
    // console.log('newI',body,body['who'],body['list']);
    body['list'].forEach( (o)=>{
        tmp.tol+=Number.parseInt(o['price']);
        tmp.list.push(o['name']);
    } );
    if(!tmp.tol)tmp.payed = true;
    return tmp;
};

schema.methods.pay= function () {
    this.payed = true;
    return this;
};
schema.method.take = function () {
    this.taken = true;
    return this;
};

mongoose.model('Person', schema);
