"use strict";function getUrlParam(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(e);return null!=a?decodeURI(a[2]):null}function getData(t){return new Promise(function(e,a){$.post(baseDomain+"/user/profit-detail",{uid:localStorage.getItem("mini_id"),where:tabIndex,out_trade_no:t.out_trade_no||null,time_start:t.time_start||null,time_end:t.time_end||null},function(t){var a=!0,n=!1,o=void 0;try{for(var i,l=t.data.lists[Symbol.iterator]();!(a=(i=l.next()).done);a=!0){var c=i.value;c.create_time=new Date(1e3*c.create_time).toLocaleString(),c.finish_time=new Date(1e3*c.finish_time).toLocaleString()}}catch(t){n=!0,o=t}finally{try{!a&&l.return&&l.return()}finally{if(n)throw o}}list=list.concat(t.data.lists),nomore=t.data.lists.length<t.data.pre_page?1:0,e(t)})})}function scrollPage(){$(this).scrollTop()+$(this).height()==$(document).height()&&(console.dir("我到底部了"),$(".modal").show(),setTimeout(function(){var t=template("item",{target:data});$(".container").append(t),$(".modal").hide()},2e3)),0==$(this).scrollTop()&&(console.dir("我到头部了"),$(".modal").show(),setTimeout(function(){var t=template("item",{target:data});$(".container").html(t),$(".modal").hide()},500))}var baseDomain="http://teach.idwenshi.com/teach/api/web/index.php",tabIndex=1,page=0,list=[],nomore=0,starData=(new Date).getFullYear()+"/"+((new Date).getMonth()+1)+"/"+(new Date).getDate(),endData=(new Date).getFullYear()+"/"+((new Date).getMonth()+1)+"/"+(new Date).getDate();$(function(){FastClick.attach(document.body),"agents"==getUrlParam("type")?($(".record-tab-tab span:eq(1)").remove(),$("title").html(getUrlParam("id"))):$(".toexcel").remove(),$("#time11").val(starData),$("#time22").val(endData),$(".modal").show(),getData({}).then(function(t){console.log(t);var e=template("item",{target:list});$(".container").html(e),$(".modal").hide()}),$(".record-tab-tab span").click(function(){$(".record-tab-tab span").removeClass("c2ca2f2"),$(this).addClass("c2ca2f2"),tabIndex=$(this).attr("data-type"),$(".modal").show();var t=template("item",{target:data});setTimeout(function(){$(".container").html(t),$(".modal").hide()},1e3)}),$(".toexcel").click(function(){$(".send-email-mask").show(),$("input").focus()}),$(".cancel").click(function(){$(".send-email-mask").hide()}),$(".confirm").click(function(){$(".send-email-mask").hide()}),$(window).scroll(scrollPage),$(".item").click(function(){console.log($(this).html())}),$(".choose-btn").click(function(){$(".icon-xiangyou").toggleClass("show"),$(".choose-time").toggleClass("height")}),$(".choose-time-confirm-btn").click(function(){if(new Date(starData).getTime()>new Date(endData).getTime())return alert("【截至时间】不能超过【起始时间】");$(".icon-xiangyou").toggleClass("show"),$(".choose-time").toggleClass("height")}),new Mdate("time1",{acceptId:"time11",format:"/",endYear:(new Date).getFullYear(),endMonth:(new Date).getMonth()+1,endDay:(new Date).getDate()},function(t){starData=t}),new Mdate("time2",{acceptId:"time22",format:"/",endYear:(new Date).getFullYear(),endMonth:(new Date).getMonth()+1,endDay:(new Date).getDate()},function(t){endData=t})});