"use strict";function getUrlParam(t){var a=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),e=window.location.search.substr(1).match(a);return null!=e?decodeURI(e[2]):null}function getData(){return $(".modal").show(),new Promise(function(t,a){$.post(baseDomain+"/shop/appear-no",{order_num:num},function(a){$(".data6").html(a.data.order_num),$(".data7").html("￥"+a.data.amount),$(".data9").html("提现方式: "+(1==a.data.tid?"红包":"零钱")),$(".data8").html(new Date(1e3*a.data.create_time).toLocaleString()),setTimeout(function(){$(".modal").hide()},500),t(a)})})}function getUser(){$.post(baseDomain+"/shop/profit-list",{mid:localStorage.getItem("mid"),uid:getUrlParam("uid")},function(t){var a=t.data.lists[0];$(".data1").html("分销商ID: "+a.id+"--"+a.nickname),$("a").attr("href","./income.html?id="+a.id+"&type=agents"),$(".data2").html(a.mall_total_fee),$(".data3").html(a.wait_profit),$(".data4").html(a.mall_appear_fee),$(".data5").html((1*a.mall_total_fee+1*a.mall_appear_fee).toFixed(2))})}function chooseAuditing(t,a){return new Promise(function(a,e){$.post(baseDomain+"/shop/ensure",{mid:localStorage.getItem("mid"),order_num:num,is_refuse:t,tid:2,reason:$("#refuse").val(),uid:getUrlParam("uid")},function(t){a(t)})})}var baseDomain="https://teach.idwenshi.com/teach/api/web/index.php",num=0,tid=1;$(function(){new VConsole,$("#__vconsole").hide();var t=0;$(".show-console").click(function(){++t>=10&&$("#__vconsole").show()});var a=!1;$(".show-mini-img").hide(),$(".show-mini-program").click(function(){a?$(".show-mini-img").hide(500):$(".show-mini-img").show(500),a=!a}),FastClick.attach(document.body),$(".cancel-mask .cancel").click(function(){$(".cancel-mask").hide()}),$(".cancel-mask2 .c2ca2f2").click(function(){chooseAuditing(1,2).then(function(t){200==t.status?($(".cancel-mask2").hide(),history.back()):alert(t.desc)})}),$(".cancel-mask2 .choose-time-confirm-btn").click(function(){chooseAuditing(1,1).then(function(t){200==t.status?(alert(t.desc),$(".cancel-mask2").hide(),history.back()):alert(t.desc)})}),$(".cancel-mask .confirm").click(function(){if($("#refuse").val().length<5)return alert("拒绝理由不能少于5个字");chooseAuditing(2).then(function(t){200==t.status?(alert(t.desc),history.back()):alert(t.desc)}),$(".cancel-mask").hide()}),num=getUrlParam("num"),getData(),getUser(),$(".cancel-mask2").click(function(){$(".cancel-mask2").hide()}),$(".container").on("click",".confirm",function(){$(".cancel-mask2").show()}).on("click",".cancel",function(){$(".cancel-mask").show()})});