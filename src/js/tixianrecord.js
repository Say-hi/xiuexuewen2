/**
 * Created by kkk on 2019/4/11.
 */
let baseDomain = 'https://teach.idwenshi.com/teach/api/web/index.php'
let tabIndex = 0
let page = 0
let nomore = 0
let str = "<div class='tac f28 c999'>--- 哎呀,没有相关数据 ---</div>"
let uid = 0
let type = 'user'
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}


function getData(obj = {}) {
  if (obj.type == 'refresh') {
    page = 0
    nomore = 0
  }
  $('.modal').show();
  return new Promise((resolve, reject) => {
    $.post(`${baseDomain}${type == 'user' ? '/user/cash-detail' : '/shop/appear-list'}`, type == 'user' ? {
        uid: getUrlParam('id') || localStorage.getItem('mini_id'),
        status: tabIndex,
        page: ++page
      } : {
        mid: localStorage.getItem('mid'),
        status: tabIndex,
        uid: getUrlParam('id'),
        page: ++page
      } , function (res) {
      try {
        for (let v of res.data.lists) {
          v.create_time = new Date(v.create_time * 1000).toLocaleString()
          v.finish_time = new Date(v.finish_time * 1000).toLocaleString()
        }
      } catch (err) {
        throw err
      }
      nomore = res.data.lists.length < res.data.pre_page ? 1 : 0
      let item = template('item', {target: res.data.lists, type: type == 'agents'});
      // setTimeout(function () {
        if (!res.data.lists.length) {
          if (page == 1) {
            $('.container').html(str)
          } else {
            $('.container').append(str)
          }
        } else {
          (obj.type == 'refresh' || page == 1 )? $('.container').html(item) : $('.container').append(item);
          if (nomore >= 1) {$('.container').append("<div class='tac f28 c999 p20'>--- 别扯了，到底了 ---</div>")}
        }
        $('.modal').hide();
      // }, 1000)
      resolve(res)
    })
  })
}

function scrollPage () {
  if ($(this).scrollTop() + $(this).height() == $(document).height()) {  //滚动到底部执行事件
    if (nomore >= 1) {
      return
    } else {
      getData()
    }
    console.dir("我到底部了")

  }
  if ($(this).scrollTop() == 0) {  //滚动到头部部执行事件
    getData({type: 'refresh'})
    console.dir("我到头部了")
  }
}
$(function () {
  FastClick.attach(document.body);
  $(window).scroll(scrollPage);
  type = getUrlParam('type') || 'user'
  if (getUrlParam('type') == 'agents') {
    $('title').html('提现记录列表')
  }
  try {
    tabIndex = getUrlParam('index') || 0
    $('.record-tab span').removeClass('c2ca2f2').eq(tabIndex).addClass('c2ca2f2');
  } catch (err) {
    throw  err
  }
  getData({type: 'refresh'})

  $('.record-tab span').click(function () {
    $('.record-tab span').removeClass('c2ca2f2');
    $(this).addClass('c2ca2f2');
    tabIndex = $(this).attr('data-type')
    getData({type: 'refresh'})
  })



  $('.item').click(function () {
    console.log($(this).html())
  })
})