"use strict";function getUrlParam(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(e);return null!=a?decodeURI(a[2]):null}function scrollPage(){$(this).scrollTop()+$(this).height()==$(document).height()&&(console.dir("我到底部了"),$(".modal").show(),setTimeout(function(){var t=template("item",{target:data});$(".container").append(t),$(".modal").hide()},1e3)),0==$(this).scrollTop()&&(console.dir("我到头部了"),setTimeout(function(){var t=template("item",{target:data});$(".container").html(t)},10))}var data=[{number:"1234234",money:100,status:1,time:new Date},{number:"1234234",money:100,status:2,time:new Date},{number:"1234234",money:100,status:3,time:(new Date).toLocaleTimeString()},{number:"1234234",money:100,status:1,time:(new Date).toLocaleDateString()},{number:"1234234",money:100,status:1,time:(new Date).toLocaleString()}];$(function(){var t=this;$(".record-tab span").click(function(){$(".record-tab span").removeClass("c2ca2f2"),$(this).addClass("c2ca2f2");var t=template("item",{target:data});$(".container").append(t)}),$(window).scroll(scrollPage),$(".item").click(function(){console.log($(t))})});