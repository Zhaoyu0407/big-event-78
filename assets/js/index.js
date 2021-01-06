let layer = layui.layer;
getUserInfo()
function getUserInfo() {  
    $.ajax({
        url:"/my/userinfo",
        // headers:{
        //     Authorization: localStorage.getItem("token")
        // },
        success:function (res) {
        
            // console.log(res); 
            
            if(res.status !== 0 ) {
                return layer.msg('获取用户信息失败')
            }
            renderUserInfo(res.data)
        },
        
    })
}

// renderUserInfo 函数可以实现将用户的头像和昵称渲染到页面中
function renderUserInfo(data) {
    // console.log(data);
    // 先处理名字
    // 需要将登录名称和昵称做优先级的处理，优先展示昵称
    let name = data.nickname || data.username;
  
    // 把名字中的第一个字符取出来转大写，作为文字头像
    let first = name[0].toUpperCase();
    // console.log(name, first);
  
    // 显示名字
    $("#welcome").text("欢迎 " + name);
  
    // 在处理头像
    // 如果data.user_pic 存在的话，就展示用户的图片头像，如果不存在，就展示文字头像
    if (data.user_pic) {
      // 展示用户的图片头像, 隐藏文字头像
      $(".layui-nav-img").attr("src", data.user_pic).show();
      $(".text-avatar").hide();
    } else {
      // 说明没有用户的图片头像，需要隐藏用户的图片头像，显示出文字头像
      $(".layui-nav-img").hide();
      $(".text-avatar").text(first).show();
    }
}

$("#signout").on('click',function () {  
    layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
        //do something
        
        // 2. 清除token
        localStorage.removeItem('token');
        
        // 3. 跳转到登录页面
        location.href = '/home/login.html';
        
        // 关闭窗口
        layer.close(index);
    })
})