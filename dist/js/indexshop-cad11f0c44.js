"use strict";function getUrlParam(a){var o=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),t=window.location.search.substr(1).match(o);return null!=t?decodeURI(t[2]):null}var baseDomain="https://teach.idwenshi.com/teach/api/web/index.php",shopInfo=null;$(function(){new VConsole,$("#__vconsole").hide();var a=0;$(".show-console").click(function(){++a>=10&&$("#__vconsole").show()}),FastClick.attach(document.body),$.post(baseDomain+"/shop/info",{uid:getUrlParam("uid")||3},function(a){shopInfo=a.data,$("#user_money").html(a.data.recharge),$("#today_in").html(a.data.wait_deal),localStorage.setItem("mid",a.data.mini_id)})});