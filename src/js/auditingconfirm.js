/**
 * Created by kkk on 2019/4/11.
 */
let baseDomain = 'https://teach.idwenshi.com/teach/api/web/index.php'
let num = 0
let tid = 1
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}

function getData() {
  $('.modal').show();
  return new Promise((resolve, reject) => {
    $.post(`${baseDomain}/shop/appear-no`, {
      order_num: num
      }, function (res) {
      $('.data6').html(res.data.order_num)
      $('.data7').html(`￥${res.data.amount}`)
      $('.data9').html(`提现方式: ${res.data.tid == 1 ? '红包' : '零钱'}`)
      $('.data8').html(new Date(res.data.create_time * 1000).toLocaleString())
      setTimeout(function () {
        $('.modal').hide();
      }, 500)
      resolve(res)
    })
  })
}

function getUser () {
  $.post(`${baseDomain}/shop/profit-list`, {mid: localStorage.getItem('mid'), uid: getUrlParam('uid') }, function (res) {
    let data = res.data.lists[0]
    $('.data1').html('分销商ID: ' + data.id)
    $('.data2').html(data.mall_total_fee)
    $('.data3').html(data.wait_profit)
    $('.data4').html(data.mall_appear_fee)
    $('.data5').html((data.mall_total_fee*1+data.mall_appear_fee*1).toFixed(2))
  })
}


function chooseAuditing (chooseType, tid) {
  return new Promise((resolve, reject) => {
    $.post(`${baseDomain}/shop/ensure`, {
      mid: localStorage.getItem('mid'),
      order_num: num,
      is_refuse: chooseType,
      tid: tid || 1,
      reason: $('#refuse').val()
    }, function (res) {
      resolve(res)
    })
  })
}

$(function () {
  FastClick.attach(document.body);
  $('.cancel-mask .cancel').click(function () {
    $('.cancel-mask').hide()
  })
  $('.cancel-mask2 .c2ca2f2').click(function () {
    chooseAuditing(1, 2).then(res => {
      if (res.status == 200) {
        $('.cancel-mask2').hide()
        history.back()
      } else {
        alert(res.desc)
      }
    })
  })
  $('.cancel-mask2 .choose-time-confirm-btn').click(function () {
    chooseAuditing(1, 1).then(res => {
      if (res.status == 200) {
        $('.cancel-mask2').hide()
        history.back()
      } else {
        alert(res.desc)
      }
    })
  })
  $('.cancel-mask .confirm').click(function () {
    if ($('#refuse').val().length < 5) {
      return alert('拒绝理由不能少于5个字')
    }
    chooseAuditing(2).then(res => {
      if (res.status == 200) {
        history.back()
      } else {
        alert(res.desc)
      }
    })
    $('.cancel-mask').hide()
  })
  num = getUrlParam('num')
  getData()
  getUser()
// 425834
//   $('.modal').show();
//   let item = template('item', data);
//   console.log(item)
//   setTimeout(function () {
//     $('.container').html(item);
//     $('.modal').hide();
//   }, 1000)
$('.cancel-mask2').click(function () {
  $('.cancel-mask2').hide()
})
  $('.container').on('click', '.confirm', function () {
    $('.cancel-mask2').show()
  }).on('click', '.cancel', function () {
    $('.cancel-mask').show()
  })
})