/**
 * Created by kkk on 2019/4/11.
 */

let baseDomain = 'http://teach.idwenshi.com/teach/api/web/index.php'
let tabIndex = 1
let page = 0
let list = []
let more = 0
function getUrlParam(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}
let data = [
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
let starData = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
let endData = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`

function getData(obj) {
  return new Promise((resolve, reject) => {
    $.post(`${baseDomain}/user/profit-detail`, {
      uid: localStorage.getItem('mini_id'),
      where: tabIndex,
      out_trade_no: obj.out_trade_no || null,
      time_start: obj.time_start || null,
      time_end: obj.time_end || null
    }, function (res) {
      for (let v of res.data.lists) {
        v.create_time = new Date(v.create_time * 1000).toLocaleString()
        v.finish_time = new Date(v.finish_time * 1000).toLocaleString()
      }
      list = list.concat(res.data.lists)
      more = res.data.lists.length <= res.data.pre_page ? 1 : 0
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
    $('.modal').show()
    setTimeout(()=> {
      let item = template('item', {target: data})
      $('.container').append(item)
      $('.modal').hide()
    }, 2000)
  }
  if ($(this).scrollTop() == 0) {  //滚动到头部部执行事件
    console.dir("我到头部了")
    $('.modal').show()
    setTimeout(()=> {
      let item = template('item', {target: data})
      $('.container').html(item)
      $('.modal').hide()
    }, 500)
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
  $('#time11').val(starData)
  $('#time22').val(endData)

  // $('.modal').show();
  // getData({}).then(res => {
  //   console.log(res)
  //   let item = template('item', {target: list});
  //   $('.container').html(item);
  //   $('.modal').hide();
  // })



// 425834
  $('.record-tab-tab span').click(function () {
    $('.record-tab-tab span').removeClass('c2ca2f2');
    $(this).addClass('c2ca2f2');
    tabIndex = $(this).attr('data-type')

    $('.modal').show();
    let item = template('item', {target: data});
    setTimeout(function () {
      $('.container').html(item);
      $('.modal').hide();
    }, 1000)
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
      return alert('结束时间不能超过开始时间')
    }
    $('.icon-xiangyou').toggleClass('show')
    $('.choose-time').toggleClass('height')
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