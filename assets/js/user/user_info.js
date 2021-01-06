$(function () {  


    let form = layui.form
    let layer = layui.layer


    form.verify({
        nickname:( value ) => {
            if(value.length > 6){
                return "昵称的长度需要在1-6字符之间"
            }
        }
    
    });    

    getInfo()
    function getInfo() {  
        $.ajax({
            url:"/my/userinfo",
            success:function (res) {  
               //给表单赋值
                form.val("form",res.data) 
            }
        })
    }

    $("#resetBtn").click(function (e) {  

        e.preventDefault()

        getInfo()
    })
    $("#form").on('submit',function (e) {  
        e.preventDefault()
        let data = $(this).serialize()
        // console.log(data);
        $.ajax({
            url:"/my/userinfo",
            type:"POST",
            data,
            success:function (res) {  
                console.log(res);
                if(res.status !== 0 ) {
                    return layer.msg("修改信息失败")
                }
                
                window.parent.getUserInfo();
                layer.msg("修改信息成功")
            }
        })
    })


})