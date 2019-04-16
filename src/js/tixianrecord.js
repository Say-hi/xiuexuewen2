/**
 * Created by kkk on 2019/4/11.
 */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}
var nogo = false
var data = [
  {
    number: '1234234',
    money: 100.00,
    status: 1,
    time: new Date()
  },
  {
    number: '1234234',
    money: 100.00,
    status: 2,
    time: new Date()
  },
  {
    number: '1234234',
    money: 100.00,
    status: 3,
    time: new Date().toLocaleTimeString()
  },
  {
    number: '1234234',
    money: 100.00,
    status: 1,
    time: new Date().toLocaleDateString()
  },
  {
    number: '1234234',
    money: 100.00,
    status: 1,
    time: new Date().toLocaleString()
  },
  {
    number: '1234234',
    money: 100.00,
    status: 3,
    time: new Date().toLocaleString()
  }
]

function scrollPage () {
  if ($(this).scrollTop() + $(this).height() == $(document).height()) {  //滚动到底部执行事件
    if (nogo) return
    nogo = true
    console.dir("我到底部了")
    $('.modal').show()
    setTimeout(()=> {
      let item = template('item', {target: data})
      $('.container').append(item)
      $('.modal').hide()
      nogo = false
    }, 2000)
  }
  if ($(this).scrollTop() == 0) {  //滚动到头部部执行事件
    console.dir("我到头部了")
    // $('.modal').show()
    // setTimeout(()=> {
    //   let item = template('item', {target: data})
    //   $('.container').html(item)
    //   $('.modal').hide()
    // }, 500)
  }
}
$(function () {
  FastClick.attach(document.body);
  if (getUrlParam('type') == 'agents') {
    $('title').html(getUrlParam('id'))
  }
  $('.modal').show();
  let item = template('item', {target: data});
  setTimeout(function () {
    $('.container').html(item);
    $('.modal').hide();
  }, 1000)
  $('.record-tab span').click(function () {
    $('.record-tab span').removeClass('c2ca2f2');
    $(this).addClass('c2ca2f2');
    $('.modal').show();
    let item = template('item', {target: data});
    setTimeout(function () {
      $('.container').html(item);
      $('.modal').hide();
    }, 1000)
  })
  $(window).scroll(scrollPage)
  $('.item').click(function () {
    console.log($(this).html())
  })
})