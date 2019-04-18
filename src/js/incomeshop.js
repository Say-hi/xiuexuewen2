/**
 * Created by kkk on 2019/4/11.
 */
let baseDomain = 'https://teach.idwenshi.com/teach/api/web/index.php'
let page = 0
let nomore = 0
let type = 'shouyi'
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}
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

function getData(obj = {}) {
  $('.modal').show();
  return new Promise((resolve, reject) => {
    $.post(`${baseDomain}/shop/profit-list`, {
    mid: localStorage.getItem('mid'),
    uid: obj.uid,
    page: ++page
    }, function (res) {
      // for (let v of res.data.lists) {
      //   v.create_time = new Date(v.create_time * 1000).toLocaleString()
      //   v.finish_time = new Date(v.finish_time * 1000).toLocaleString()
      // }
      nomore = res.data.lists.length < res.data.pre_page ? 1 : 0
      let item = template('item', {target: res.data.lists, type});
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
  }
  if ($(this).scrollTop() == 0) {  //滚动到头部部执行事件
    page = 0
    nomore = 0
    $('input').val('')
    getData({type: 'refresh'})
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
  type = getUrlParam('type')
  getData({type: 'refresh'})

  $('.record-tab-tab span').click(function () {
    $('.record-tab-tab span').removeClass('c2ca2f2');
    $(this).addClass('c2ca2f2');
    $('.modal').show();
    let item = template('item', {target: data});
    setTimeout(function () {
      $('.container').html(item);
      $('.modal').hide();
    }, 1000)
  })

  $('form').on('submit', function () {
    if ($('input').val().length <= 0) {
      return alert('请输入内容')
    }
    $('input').blur()
    page = 0
    nomore = 0
    getData({type: 'refresh', uid: $('input').val()})
    return false
  })

  $(window).scroll(scrollPage)
})