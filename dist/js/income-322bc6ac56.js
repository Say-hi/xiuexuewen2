"use strict";function getUrlParam(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(t);return null!=a?decodeURI(a[2]):null}function getData(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return $(".modal").show(),new Promise(function(t,a){$.post(baseDomain+"/user/profit-detail",{uid:getUrlParam("id")||localStorage.getItem("mini_id"),where:tabIndex,page:++page,out_trade_no:e.out_trade_no||null,time_start:2==tabIndex?((new Date).getTime()/1e3).toFixed(0):needDate?new Date(starData).getTime()/1e3:e.time_start||null,time_end:2==tabIndex?0:needDate?new Date(endData).getTime()/1e3:e.time_start||null},function(a){var n=!0,o=!1,i=void 0;try{for(var r,l=a.data.lists[Symbol.iterator]();!(n=(r=l.next()).done);n=!0){var s=r.value;s.create_time=s.create_time?new Date(1e3*s.create_time).toLocaleString():"暂无记录",s.finish_time=s.finish_time?new Date(1e3*s.finish_time).toLocaleString():"暂无记录"}}catch(e){o=!0,i=e}finally{try{!n&&l.return&&l.return()}finally{if(o)throw i}}nomore=a.data.lists.length<a.data.pre_page?1:0;var c=template("item",{target:a.data.lists});a.data.lists.length?("refresh"==e.type||1==page?$(".container").html(c):$(".container").append(c),nomore>=1&&$(".container").append("<div class='tac f28 c999 p20'>--- 别扯了，到底了 ---</div>")):1==page?$(".container").html(str):$(".container").append(str),$(".modal").hide(),t(a)})})}function scrollPage(){if($(this).scrollTop()+$(this).height()==$(document).height()){if(console.dir("我到底部了"),nomore>=1)return;getData()}0==$(this).scrollTop()&&(console.dir("我到头部了"),page=0,nomore=0,getData({type:"refresh"}))}var baseDomain="https://teach.idwenshi.com/teach/api/web/index.php",tabIndex=1,page=0,nomore=0,needDate=!1,str="<div class='tac f28 c999'>--- 哎呀，没有相关数据了 ---</div>",emailCheck=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,starData=(new Date).getFullYear()+"/"+((new Date).getMonth()+1)+"/"+(new Date).getDate(),endData=(new Date).getFullYear()+"/"+((new Date).getMonth()+1)+"/"+(new Date).getDate();$(function(){new VConsole,$("#__vconsole").hide();var e=0;$(".show-console").click(function(){++e>=10&&$("#__vconsole").show()}),FastClick.attach(document.body),"agents"==getUrlParam("type")?($(".record-tab-tab span:eq(1)").remove(),$("title").html(getUrlParam("id"))):$(".toexcel").remove(),getUrlParam("i")&&(tabIndex=getUrlParam("i"),$(".record-tab-tab span").removeClass("c2ca2f2").eq(getUrlParam("i")).addClass("c2ca2f2")),$("#time11").val(starData),$("#time22").val(endData),getData(),$("form").on("submit",function(){return $(".search-area input").val().length<=0?alert("请输入搜索单号"):($(".search-area input").blur(),page=0,nomore=0,getData({type:"refresh",out_trade_no:$("input").val()}),!1)}),$(".record-tab-tab span").click(function(){$(".record-tab-tab span").removeClass("c2ca2f2"),$(this).addClass("c2ca2f2"),tabIndex=$(this).attr("data-type"),page=0,nomore=0,getData({type:"refresh"})}),$(".toexcel").click(function(){$(".send-email-mask").show(),$("input").focus()}),$(".cancel").click(function(){$(".send-email-mask").hide()}),$(".confirm").click(function(){if(!emailCheck.test($(".sem-container input").val()))return alert("请填写有效的邮箱地址");$.post(baseDomain+"/shop/excel",{uid:getUrlParam("id"),where:tabIndex,email:$(".sem-container input").val(),out_trade_no:$(".search-area input").val(),time_start:needDate?new Date(starData).getTime()/1e3:"",time_end:needDate?new Date(endData).getTime()/1e3:""},function(e){400==e.status&&alert(e.desc),$(".send-email-mask").hide()})}),$(window).scroll(scrollPage),$(".item").click(function(){console.log($(this).html())}),$(".choose-btn").click(function(){$(".icon-xiangyou").toggleClass("show"),$(".choose-time").toggleClass("height")}),$(".choose-time-confirm-btn").click(function(){if(new Date(starData).getTime()>new Date(endData).getTime())return alert("【截至时间】不能超过【起始时间】");needDate=!0,$(".icon-xiangyou").toggleClass("show"),$(".choose-time").toggleClass("height"),page=0,nomore=0,getData({type:"refresh",time_start:new Date(starData).getTime()/1e3,time_end:new Date(endData).getTime()/1e3})}),$(".choose-time-cancel-btn").click(function(){$("#time11").attr("data-year",(new Date).getFullYear()).attr("data-month",(new Date).getMonth()+1).attr("data-day",(new Date).getDate()).val((new Date).getFullYear()+"/"+((new Date).getMonth()+1)+"/"+(new Date).getDate()),$("#time22").attr("data-year",(new Date).getFullYear()).attr("data-month",(new Date).getMonth()+1).attr("data-day",(new Date).getDate()).val((new Date).getFullYear()+"/"+((new Date).getMonth()+1)+"/"+(new Date).getDate()),needDate=!1,$(".icon-xiangyou").toggleClass("show"),$(".choose-time").toggleClass("height"),page=0,nomore=0,getData({type:"fresh"})}),new Mdate("time1",{acceptId:"time11",format:"/",endYear:(new Date).getFullYear(),endMonth:(new Date).getMonth()+1,endDay:(new Date).getDate()},function(e){starData=e}),new Mdate("time2",{acceptId:"time22",format:"/",endYear:(new Date).getFullYear(),endMonth:(new Date).getMonth()+1,endDay:(new Date).getDate()},function(e){endData=e})});