"use strict";function getUrlParam(o){var i=new RegExp("(^|&)"+o+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(i);return null!=a?decodeURI(a[2]):null}var baseDomain="https://teach.idwenshi.com/teach/api/web/index.php",shopInfo=null;$(function(){new VConsole,$("#__vconsole").hide();var o=0;$(".show-console").click(function(){++o>=10&&$("#__vconsole").show()});var i=!1;$(".show-mini-img").hide(),$(".show-mini-program").click(function(){i?$(".show-mini-img").hide(500):$(".show-mini-img").show(500),i=!i}),FastClick.attach(document.body),$.post(baseDomain+"/shop/info",{uid:getUrlParam("uid")||3},function(o){shopInfo=o.data,$("#user_money").html(o.data.recharge),$("#today_in").html(o.data.wait_deal),localStorage.setItem("mid",o.data.mini_id),localStorage.setItem("mid",getUrlParam("uid")||3)})});