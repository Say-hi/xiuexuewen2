"use strict";!function(e,t){function n(){t.body?t.body.style.fontSize=12*o+"px":t.addEventListener("DOMContentLoaded",n)}function i(){var e=d.clientWidth/10;d.style.fontSize=e+"px"}window.history.forward(1);var d=t.documentElement,o=e.devicePixelRatio||1;if(n(),i(),e.addEventListener("resize",i),e.addEventListener("pageshow",function(e){e.persisted&&i()}),o>=2){var r=t.createElement("body"),s=t.createElement("div");s.style.border=".5px solid transparent",r.appendChild(s),d.appendChild(r),1===s.offsetHeight&&d.classList.add("hairlines"),d.removeChild(r)}}(window,document);