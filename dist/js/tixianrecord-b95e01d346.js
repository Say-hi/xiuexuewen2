"use strict";function getUrlParam(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(e);return null!=a?decodeURI(a[2]):null}function getData(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return"refresh"==t.type&&(page=0,nomore=0),$(".modal").show(),new Promise(function(e,a){$.post(baseDomain+"/user/cash-detail",{uid:getUrlParam("id")||localStorage.getItem("mini_id"),status:tabIndex,page:++page},function(a){var r=!0,i=!1,n=void 0;try{for(var o,s=a.data.lists[Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var c=o.value;c.create_time=new Date(1e3*c.create_time).toLocaleString(),c.finish_time=new Date(1e3*c.finish_time).toLocaleString()}}catch(t){i=!0,n=t}finally{try{!r&&s.return&&s.return()}finally{if(i)throw n}}nomore=a.data.lists.length<a.data.pre_page?1:0;var l=template("item",{target:a.data.lists,type:getUrlParam("id")>=1});setTimeout(function(){a.data.lists.length?("refresh"==t.type||1==page?$(".container").html(l):$(".container").append(l),nomore>=1&&$(".container").append("<div class='tac f28 c999 p20'>--- 别扯了，到底了 ---</div>")):1==page?$(".container").html(str):$(".container").append(str),$(".modal").hide()},1e3),e(a)})})}function scrollPage(){if($(this).scrollTop()+$(this).height()==$(document).height()){if(nomore>=1)return;getData(),console.dir("我到底部了")}0==$(this).scrollTop()&&(getData({type:"refresh"}),console.dir("我到头部了"))}var baseDomain="https://teach.idwenshi.com/teach/api/web/index.php",tabIndex=0,page=0,nomore=0,str="<div class='tac f28 c999'>--- 哎呀,没有相关数据 ---</div>",uid=0;$(function(){FastClick.attach(document.body),$(window).scroll(scrollPage),"agents"==getUrlParam("type")&&$("title").html(getUrlParam("id")),getData({type:"refresh"}),$(".record-tab span").click(function(){$(".record-tab span").removeClass("c2ca2f2"),$(this).addClass("c2ca2f2"),tabIndex=$(this).attr("data-type"),getData({type:"refresh"})}),$(".item").click(function(){console.log($(this).html())})});