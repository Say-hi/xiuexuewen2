"use strict";function getUrlParam(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(e);return null!=n?decodeURI(n[2]):null}function scrollPage(){$(this).scrollTop()+$(this).height()==$(document).height()&&console.dir("我到底部了"),0==$(this).scrollTop()&&console.dir("我到头部了")}var data=[{number:"1234234",money:100,status:1,time:new Date},{number:"1234234",money:100,status:2,time:new Date},{number:"1234234",money:100,status:3,time:(new Date).toLocaleTimeString()},{number:"1234234",money:100,status:1,time:(new Date).toLocaleDateString()},{number:"1234234",money:100,status:1,time:(new Date).toLocaleString()},{number:"1234234",money:100,status:3,time:(new Date).toLocaleString()}];$(function(){$(".record-tab span").click(function(){$(".record-tab span").removeClass("c2ca2f2"),$(this).addClass("c2ca2f2")}),$(window).scroll(scrollPage),$(".item").click(function(){console.log($(this).html())})});