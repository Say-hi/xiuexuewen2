"use strict";!function(){var e=document,t={beginYear:2019,beginMonth:1,beginDay:1,endYear:(new Date).getFullYear(),endMonth:(new Date).getMonth()+1,endDay:(new Date).getDate(),format:"YMD"},a="",n="",i="",r="",l=1,d=1,o=1,c=null,s=null,g=null,u=null,h=null,y=function(a,n,i){n||(n={}),this.callback=i,this.id=a,this.selectorId=e.getElementById(this.id),this.acceptId=e.getElementById(n.acceptId)||e.getElementById(this.id),this.beginYear=n.beginYear||t.beginYear,this.beginMonth=n.beginMonth||t.beginMonth,this.beginDay=n.beginDay||t.beginDay,this.endYear=n.endYear||t.endYear,this.endMonth=n.endMonth||t.endMonth,this.endDay=n.endDay||t.endDay,this.format=n.format||t.format,this.dateBoxShow()};y.prototype={constructor:y,dateBoxShow:function(){var e=this;e.selectorId.onclick=function(){e.createDateBox(),e.dateSure()}},createDateBox:function(){var t=this;MdatePlugin=e.getElementById("MdatePlugin"),MdatePlugin||(a=e.createElement("div"),a.id="MdatePlugin",e.body.appendChild(a),MdatePlugin=e.getElementById("MdatePlugin")),MdatePlugin.setAttribute("class","slideIn"),t.createDateUi();var n=e.getElementById("yearUl");e.getElementById("monthUl"),e.getElementById("dayUl");n.innerHTML=t.createDateYMD("year"),t.initScroll(),t.refreshScroll()},createDateUi:function(){MdatePlugin.innerHTML='<section class="getDateBg"></section><section class="getDateBox" id="getDateBox"><div class="choiceDateTitle"><button id="dateCancel">取消</button><button id="dateSure" class="fr">确定</button></div><div class="dateContent"><div class="checkeDate"></div><div id="yearwrapper"><ul id="yearUl"></ul></div><div id="monthwrapper"><ul id="monthUl"></ul></div><div id="daywrapper"><ul id="dayUl"></ul></div></div></section>'},createDateYMD:function(e){var a=this,r="<li>&nbsp;</li>",l=null,d=null,o="年",c="data-year";"year"==e&&(l=a.beginYear,d=a.endYear),"month"==e&&(o="月",c="data-month",l=a.beginMonth,d=12,n!=a.beginYear&&(l=1),n==t.endYear&&(d=a.endMonth)),"day"==e&&(o="日",c="data-day",l=1,d=new Date(n,i,0).getDate(),n==a.beginYear&&i==a.beginMonth&&(l=a.beginDay),n==a.endYear&&i==a.endMonth&&(d=a.endDay));for(var s=l;s<=d;s++)r+="<li "+c+"="+s+">"+a.dateForTen(s)+o+"</li>";return r+"<li>&nbsp;</li>"},initScroll:function(){var e=this;g=new iScroll("yearwrapper",{snap:"li",vScrollbar:!1,onScrollEnd:function(){l=Math.ceil(this.y/40*-1+1),n=yearUl.getElementsByTagName("li")[l].getAttribute("data-year"),monthUl.innerHTML=e.createDateYMD("month"),u.refresh();try{i=monthUl.getElementsByTagName("li")[d].getAttribute("data-month")}catch(e){return!0}dayUl.innerHTML=e.createDateYMD("day"),h.refresh();try{r=dayUl.getElementsByTagName("li")[o].getAttribute("data-day")}catch(e){return!0}}}),u=new iScroll("monthwrapper",{snap:"li",vScrollbar:!1,onScrollEnd:function(){d=Math.ceil(this.y/40*-1+1),i=1==d&&n!=e.beginYear?1:monthUl.getElementsByTagName("li")[d].getAttribute("data-month"),dayUl.innerHTML=e.createDateYMD("day"),h.refresh();try{r=dayUl.getElementsByTagName("li")[o].getAttribute("data-day")}catch(e){return!0}}}),h=new iScroll("daywrapper",{snap:"li",vScrollbar:!1,onScrollEnd:function(){o=Math.ceil(this.y/40*-1+1),r=1==o&&i!=e.beginMonth?1:dayUl.getElementsByTagName("li")[o].getAttribute("data-day")}})},refreshScroll:function(){var e=this,t=e.acceptId.getAttribute("data-year"),a=e.acceptId.getAttribute("data-month"),n=e.acceptId.getAttribute("data-day");t=t||e.beginYear,a=a||e.beginMonth,n=n||e.beginDay,c=e.beginMonth,s=e.beginDay,t!=e.beginYear&&1!=c&&(c=1),a!=e.beginMonth&&1!=s&&(s=1),t-=e.beginYear,a-=c,n-=s,g.refresh(),g.scrollTo(0,40*t,300,!0),u.scrollTo(0,40*a,300,!0),h.scrollTo(0,40*n,300,!0)},dateSure:function(){var t=this,a=e.getElementById("dateSure"),l=e.getElementById("dateCancel");a.onclick=function(){"YMD"==t.format?t.acceptId.value=n+"年"+i+"月"+r+"日":t.acceptId.value=n+t.format+t.dateForTen(i)+t.format+t.dateForTen(r),t.acceptId.setAttribute("data-year",n),t.acceptId.setAttribute("data-month",i),t.acceptId.setAttribute("data-day",r),t.callback&&t.callback(n+"/"+i+"/"+r),t.dateCancel()},l.onclick=function(){t.dateCancel()}},dateForTen:function(e){return e<10?"0"+e:e},dateCancel:function(){MdatePlugin.setAttribute("class","slideOut"),setTimeout(function(){MdatePlugin.innerHTML=""},400)}},"undefined"!=typeof exports?exports.Mdate=y:window.Mdate=y}();