"use strict";function getUrlParam(a){var t=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),e=window.location.search.substr(1).match(t);return null!=e?decodeURI(e[2]):null}var baseDomain="https://teach.idwenshi.com/teach/api/web/index.php",userInfo=null;$(function(){FastClick.attach(document.body),$.post(baseDomain+"/shop/info",{uid:getUrlParam("uid")||3},function(a){shopInfo=a.data,$("#user_money").html(a.data.recharge),$("#today_in").html(a.data.wait_deal),localStorage.setItem("mid",a.data.mini_id)})});