"use strict";function getUrlParam(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(t);return null!=a?decodeURI(a[2]):null}function getData(e){return $(".modal").show(),new Promise(function(t,a){$.post(baseDomain+"/user/profit-detail",{uid:localStorage.getItem("mini_id"),where:tabIndex,page:++page,out_trade_no:e.out_trade_no||null,time_start:e.time_start||null,time_end:e.time_end||null},function(a){var n=!0,o=!1,i=void 0;try{for(var l,r=a.data.lists[Symbol.iterator]();!(n=(l=r.next()).done);n=!0){var c=l.value;c.create_time=new Date(1e3*c.create_time).toLocaleString(),c.finish_time=new Date(1e3*c.finish_time).toLocaleString()}}catch(e){o=!0,i=e}finally{try{!n&&r.return&&r.return()}finally{if(o)throw i}}list=list.concat(a.data.lists),nomore=a.data.lists.length<a.data.pre_page?1:0;var s=template("item",{target:a.data.lists});setTimeout(function(){"refresh"==e.type?$(".container").html(s):$(".container").append(s),$(".modal").hide()},1e3),t(a)})})}function scrollPage(){$(this).scrollTop()+$(this).height()==$(document).height()&&(console.dir("我到底部了"),$(".modal").show()),0==$(this).scrollTop()&&(console.dir("我到头部了"),$(".modal").show())}var baseDomain="http://teach.idwenshi.com/teach/api/web/index.php",tabIndex=1,page=0,list=[],nomore=0,starData=(new Date).getFullYear()+"/"+((new Date).getMonth()+1)+"/"+(new Date).getDate(),endData=(new Date).getFullYear()+"/"+((new Date).getMonth()+1)+"/"+(new Date).getDate();$(function(){FastClick.attach(document.body),"agents"==getUrlParam("type")?($(".record-tab-tab span:eq(1)").remove(),$("title").html(getUrlParam("id"))):$(".toexcel").remove(),$("#time11").val(starData),$("#time22").val(endData),$(".modal").show(),getData({}),$(".record-tab-tab span").click(function(){$(".record-tab-tab span").removeClass("c2ca2f2"),$(this).addClass("c2ca2f2"),tabIndex=$(this).attr("data-type"),page=0,nomore=0,getData({type:"refresh"})}),$(".toexcel").click(function(){$(".send-email-mask").show(),$("input").focus()}),$(".cancel").click(function(){$(".send-email-mask").hide()}),$(".confirm").click(function(){$(".send-email-mask").hide()}),$(window).scroll(scrollPage),$(".item").click(function(){console.log($(this).html())}),$(".choose-btn").click(function(){$(".icon-xiangyou").toggleClass("show"),$(".choose-time").toggleClass("height")}),$(".choose-time-confirm-btn").click(function(){if(new Date(starData).getTime()>new Date(endData).getTime())return alert("【截至时间】不能超过【起始时间】");$(".icon-xiangyou").toggleClass("show"),$(".choose-time").toggleClass("height")}),new Mdate("time1",{acceptId:"time11",format:"/",endYear:(new Date).getFullYear(),endMonth:(new Date).getMonth()+1,endDay:(new Date).getDate()},function(e){starData=e}),new Mdate("time2",{acceptId:"time22",format:"/",endYear:(new Date).getFullYear(),endMonth:(new Date).getMonth()+1,endDay:(new Date).getDate()},function(e){endData=e})});