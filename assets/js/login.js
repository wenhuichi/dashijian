$(function(){
    //点击去注册按钮的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录按钮
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
})

//设置密码框的验证
//获取layui的form属性
var form = layui.form
//获取layui的layer属性
var layer = layui.layer
form.verify({
    //密码框的校验
    pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位且不能出现空格'
      ],
    //确认密码框的校验
    repass:function(value){
        var a = $('.reg-box [name="repassword"]').val();
        if(a !== value){
            return '两次输入的密码不一致';
        }
    }
})


//监听注册表单事件
$('#form_reg').on('click',function(e){
    e.preventDefault();

    //提交的用户注册数据
    var data = {
        username:$('#form_r [name=username]').val(),
        password:$('#form_r [name=password]').val()
    }

    $.post('/api/reguser',data,function(res){
        if(res.status !== 0){
            console.log(res.message);
            return layer.msg(res.message);
        }
        layer.msg('注册成功!请登录');
        //自动跳回到登录界面
        $('#link_login').click()
    }
    )
})

//监测登录表单的提交事件
$('#form_login').submit(function(e){
    //组织默认提交行为
    e.preventDefault()
    $.ajax({
        url:'/api/login',
        method:'POST',
        //快速获取表单的值
        data:$(this).serialize(),
        success:function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('登录成功！')
            //将token值存起来
            localStorage.setItem('token',res.token)
            //跳转到后台主页
            location.href = '/index.html'
        }
    })

})