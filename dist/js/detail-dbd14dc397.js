"use strict";function getUrlParam(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(t);return null!=a?decodeURI(a[2]):null}function getData(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return $(".modal").show(),new Promise(function(t,a){$.post(baseDomain+"/user/profit-detail",{uid:getUrlParam("id")||localStorage.getItem("mini_id"),where:tabIndex,page:++page,out_trade_no:e.out_trade_no||null,time_start:2==tabIndex?((new Date).getTime()/1e3).toFixed(0):needDate?new Date(starData).getTime()/1e3:e.time_start||null,time_end:2==tabIndex?0:needDate?new Date(endData).getTime()/1e3:e.time_start||null},function(a){var n=!0,i=!1,r=void 0;try{for(var o,l=a.data.lists[Symbol.iterator]();!(n=(o=l.next()).done);n=!0){var d=o.value;d.create_time=d.create_time?new Date(1e3*d.create_time).toLocaleString():"暂无记录",d.finish_time=d.finish_time?new Date(1e3*d.finish_time).toLocaleString():"暂无记录"}}catch(e){i=!0,r=e}finally{try{!n&&l.return&&l.return()}finally{if(i)throw r}}nomore=a.data.lists.length<a.data.pre_page?1:0;var m=template("item",{target:a.data.lists});a.data.lists.length?("refresh"==e.type||1==page?$(".container").html(m):$(".container").append(m),nomore>=1&&$(".container").append("<div class='tac f28 c999 p20'>--- 别扯了，到底了 ---</div>")):1==page?$(".container").html(str):$(".container").append(str),$(".modal").hide(),t(a)})})}$(function(){getUrlParam("id")});