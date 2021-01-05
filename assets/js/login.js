$(function () {  
  // 注册账号
  $("#gotoRegi").on('click',function () {  

    // 显示注册
    $('.register').show()

    // 隐藏登录
    $('.login').hide()
  })
  // 去登录
  $("#gotoLogin").click(function () {  

    // 隐藏注册
    $('.register').hide()

    // 显示登录
    $('.login').show()
  })
// 自定义校验规则
let form = layui.form
  form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    // 添加两次输入的密码必须一致的校验规则
     repwd:function (value) {  
       //value：表单的值、item：表单的DOM对象
      let pwd = $(".register [name=password]").val()
      if(value !== pwd) {
        return "密码不一致"
      }
    }
  }); 
  
  let layer = layui.layer
  // 实现注册功能
  $("#regiForm").on("submit",function (e) {  
    // 1.阻止表单的默认行为
    // 2.获取到表单的数据
    // 3.发送ajax实现注册功能
    // 4.弹框提示注册情况如何

    e.preventDefault()

    let data = $(this).serialize()
    
    $.ajax({
      type:"POST",
      url:"http://api-breakingnews-web.itheima.net/api/reguser",
      data,
      success:function (res) {  
        if(res.status !== 0 ) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功');


        $("#gotoLogin").click()
      }
    })

  })

  // 实现登录功能

  
  $("#loginForm").on("submit",function (e) {  

    e.preventDefault()

    let data = $(this).serialize()

    $.ajax({
      type:"POST",
      url:"http://api-breakingnews-web.itheima.net/api/login",
      data,
      success:function (res) {  
        if(res.status !== 0) {
          return layer.msg("登录失败")
        }
        localStorage.setItem("token", res.token);
        layer.msg("登录成功，即将跳转首页", function(){
          
          location.href = "/home/index.html"
        }); 
      }
    })
  })
})