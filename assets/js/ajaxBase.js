$.ajaxPrefilter(function (options) {
    // 每次ajax请求发送前，都会执行该函数，通过该函数的形参options可以获取到每次ajax请求发送的配置项
    // 来优化url （根路径）
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    // console.log("函数执行了", options.url);

  //   options.headers= {
  //     Authorization: localStorage.getItem("token")
  // }
    if(options.url.indexOf("/my") !== -1) {
      options.headers= {
        Authorization: localStorage.getItem("token")
    } 
    }

    options.complete = function (xhr) {  
      if(xhr.responseJSON.status === 1 && xhr.responseJSON.message === "身份认证失败！"){
          location.href = "/home/login.html"
      }
  }
});
  