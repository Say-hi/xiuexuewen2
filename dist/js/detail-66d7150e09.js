"use strict";function getUrlParam(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),o=window.location.search.substr(1).match(e);return null!=o?decodeURI(o[2]):null}function getData(t){return $(".modal").show(),new Promise(function(e,o){$.post(baseDomain+"/shop/order",{uid:getUrlParam("id")||localStorage.getItem("mini_id"),id:t||0},function(t){var o=template("item",{target:t.data.lists});$(".container").html(o),$(".modal").hide(),e(t)})})}$(function(){new VConsole,$("#__vconsole").hide();var t=0;$(".show-console").click(function(){++t>=10&&$("#__vconsole").show()}),FastClick.attach(document.body);getUrlParam("id");getData(getUrlParam("id"))});