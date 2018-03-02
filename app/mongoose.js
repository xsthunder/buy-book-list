/**
 *   For
 *   Created by xs at 2018/3/2
 */
"use strict";


const mongoose = require('mongoose');
require('./schema');
mongoose.connect('mongodb://127.0.0.1:19970/buy-book-list',{
});
mongoose.connection.on('connected',function () {
    console.log(`${Date()} mongoose connected to `);
});

mongoose.connection.on('error',function (err) {
    console.error(`${Date()} mongoose error  ${err}`)
});

mongoose.connection.on('disconnected',function () {
    console.error(`${Date()} mongoose disconnected `)
});
mongoose.Promise = global.Promise;
module.exports = mongoose;
