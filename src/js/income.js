/**
 * Created by kkk on 2019/4/11.
 */

let baseDomain = 'https://teach.idwenshi.com/teach/api/web/index.php'
let tabIndex = 1
let page = 0
let nomore = 0
let needDate = false
let str = "<div class='tac f28 c999'>--- 哎呀，没有相关数据了 ---</div>"
function getUrlParam(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}
let starData = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
let endData = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`

function getData(obj = {}) {
  $('.modal').show();
  return new Promise((resolve, reject) => {
    $.post(`${baseDomain}/user/profit-detail`, {
      uid: localStorage.getItem('mini_id'),
      where: tabIndex,
      page: ++page,
      out_trade_no: obj.out_trade_no || null,
      time_start: tabIndex == 2 ? (new Date().getTime() / 1000).toFixed(0) : needDate ? new Date(starData).getTime() / 1000 :  obj.time_start || null,
      time_end: tabIndex == 2 ? 0 : needDate ? new Date(endData).getTime() / 1000 :  obj.time_start || null
    }, function (res) {
      for (let v of res.data.lists) {
        v.create_time = new Date(v.create_time * 1000).toLocaleString()
        v.finish_time = new Date(v.finish_time * 1000).toLocaleString()
      }
      nomore = res.data.lists.length < res.data.pre_page ? 1 : 0
      let item = template('item', {target: res.data.lists});
      setTimeout(function () {
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
      }, 1000)
      resolve(res)
    })
  })
}

function scrollPage () {
//      var scrollTop = $(this).scrollTop();
//      var scrollHeight = $(document).height();
//      var windowHeight = $(this).height();
  if ($(this).scrollTop() + $(this).height() == $(document).height()) {  //滚动到底部执行事件
    console.dir("我到底部了")
    if (nomore >= 1) {
      return
    } else {
      getData()
    }
    // setTimeout(()=> {
    //   let item = template('item', {target: data})
    //   $('.container').append(item)
    //   $('.modal').hide()
    // }, 2000)
  }

  if ($(this).scrollTop() == 0) {  //滚动到头部部执行事件
    console.dir("我到头部了")
    page = 0
    nomore = 0
    getData({type: 'refresh'})
    // setTimeout(()=> {
    //   let item = template('item', {target: data})
    //   $('.container').html(item)
    //   $('.modal').hide()
    // }, 500)
  }
}

$(function () {
  FastClick.attach(document.body);

  // 判断进入
  if (getUrlParam('type') == 'agents') {
    $('.record-tab-tab span:eq(1)').remove()
    $('title').html(getUrlParam('id'))
  } else {
    $('.toexcel').remove()
  }
  if (getUrlParam('i')) {
    tabIndex = getUrlParam('i')
    $(".record-tab-tab span").removeClass('c2ca2f2').eq(getUrlParam('i')).addClass('c2ca2f2')
  }
  $('#time11').val(starData)
  $('#time22').val(endData)

  getData()

  $('form').on('submit', function () {
    if ($('input').val().length <= 0) {
      return alert('请输入搜索单号')
    }
    $('input').blur()
    page = 0
    nomore = 0
    getData({type: 'refresh', out_trade_no: $('input').val()})
    return false
  })

// 425834
  $('.record-tab-tab span').click(function () {
    $('.record-tab-tab span').removeClass('c2ca2f2');
    $(this).addClass('c2ca2f2');
    tabIndex = $(this).attr('data-type')
    page = 0
    nomore = 0
    getData({type: 'refresh'})
  })


  $('.toexcel').click(function () {
    $('.send-email-mask').show()
    $('input').focus()
  })

  $('.cancel').click(function () {
    $('.send-email-mask').hide()
  })

  $('.confirm').click(function () {
    $('.send-email-mask').hide()
  })

  $(window).scroll(scrollPage)

  $('.item').click(function () {
    console.log($(this).html())
  })

  $('.choose-btn').click(function () {
    $('.icon-xiangyou').toggleClass('show')
    $('.choose-time').toggleClass('height')
  })

  $('.choose-time-confirm-btn').click(function () {
    if (new Date(starData).getTime() > new Date(endData).getTime()) {
      return alert('【截至时间】不能超过【起始时间】')
    }
    needDate = true
    $('.icon-xiangyou').toggleClass('show')
    $('.choose-time').toggleClass('height')
    page = 0
    nomore = 0
    getData({type: 'refresh', time_start: new Date(starData).getTime() / 1000, time_end: new Date(endData).getTime() / 1000})
  })

  $('.choose-time-cancel-btn').click(function () {
    $('#time11').attr('data-year', new Date().getFullYear()).attr('data-month', new Date().getMonth() + 1).attr('data-day', new Date().getDate()).val(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`)
    $('#time22').attr('data-year', new Date().getFullYear()).attr('data-month', new Date().getMonth() + 1).attr('data-day', new Date().getDate()).val(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`)
    needDate = false
    $('.icon-xiangyou').toggleClass('show')
    $('.choose-time').toggleClass('height')
    page = 0
    nomore = 0
    getData({type: 'fresh'})
  })

  new Mdate('time1', {
    acceptId: 'time11',
    format: '/',
    endYear: new Date().getFullYear(),
    endMonth: new Date().getMonth() + 1,
    endDay: new Date().getDate()
  }, function (startDate) {
    starData = startDate
  })

  new Mdate('time2', {
    acceptId: 'time22',
    format: '/',
    endYear: new Date().getFullYear(),
    endMonth: new Date().getMonth() + 1,
    endDay: new Date().getDate()
  }, function (endDate) {
    endData = endDate
  })
})