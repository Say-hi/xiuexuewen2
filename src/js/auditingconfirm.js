/**
 * Created by kkk on 2019/4/11.
 */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}
var data = {
    number: '1234234',
    money: 100.00,
    status: 1,
    time: new Date()
  }


$(function () {
  FastClick.attach(document.body);
// 425834
  $('.modal').show();
  let item = template('item', data);
  console.log(item)
  setTimeout(function () {
    $('.container').html(item);
    $('.modal').hide();
  }, 1000)

  $('.container').on('click', '.confirm', function () {
    console.log(1)
    history.back()
  }).on('click', '.cancel', function () {
    console.log(2)
    history.back()
  })
})