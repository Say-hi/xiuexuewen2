"use strict";function getUrlParam(t){var n=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),e=window.location.search.substr(1).match(n);return null!=e?decodeURI(e[2]):null}var data={number:"1234234",money:100,status:1,time:new Date};$(function(){$(".modal").show();var t=template("item",data);console.log(t),setTimeout(function(){$(".container").html(t),$(".modal").hide()},1e3),$("html").on("click",".confirm",function(){history.back()}),$(".cancel").click(function(){history.back()})});