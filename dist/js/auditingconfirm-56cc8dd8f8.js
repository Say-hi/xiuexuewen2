"use strict";function getUrlParam(n){var t=new RegExp("(^|&)"+n+"=([^&]*)(&|$)"),e=window.location.search.substr(1).match(t);return null!=e?decodeURI(e[2]):null}var data={number:"1234234",money:100,status:1,time:new Date};$(function(){$(".modal").show();var n=template("item",data);console.log(n),setTimeout(function(){$(".container").html(n),$(".modal").hide()},1e3),$(".container").on("click",".confirm",function(){history.back()}),$(".container").on("click",".cancel",function(){history.back()})});