"use strict";function getUrlParam(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(e);return null!=a?decodeURI(a[2]):null}function scrollPage(){$(this).scrollTop()+$(this).height()==$(document).height()&&(console.dir("我到底部了"),$(".modal").show(),setTimeout(function(){var t=template("item",{target:data});$(".container").append(t),$(".modal").hide()},2e3)),0==$(this).scrollTop()&&(console.dir("我到头部了"),$(".modal").show(),setTimeout(function(){var t=template("item",{target:data});$(".container").html(t),$(".modal").hide()},500))}var data=[{number:"1234234",money:100,status:1,time:new Date},{number:"1234234",money:100,status:2,time:new Date},{number:"1234234",money:100,status:3,time:(new Date).toLocaleTimeString()},{number:"1234234",money:100,status:1,time:(new Date).toLocaleDateString()},{number:"1234234",money:100,status:1,time:(new Date).toLocaleString()},{number:"1234234",money:100,status:3,time:(new Date).toLocaleString()}];$(function(){$(".record-tab-tab span").click(function(){$(".record-tab-tab span").removeClass("c2ca2f2"),$(this).addClass("c2ca2f2"),$(".modal").show();var t=template("item",{target:data});setTimeout(function(){$(".container").html(t),$(".modal").hide()},1e3)}),$(window).scroll(scrollPage),$(".item").click(function(){console.log($(this).html())})});