$(function(){
    //调用getUserInfo获取用户信息
    getUserInfo()
})

//引入layui中的属性
var layer = layui.layer

//点击退出按钮实现退出功能
$('#btnLogout').on('click',function(){
    //弹出框
    layer.confirm('是否退出登录？', {icon: 3, title:'提示'}, 
    function(index){
        //清空本地存储的token
        localStorage.removeItem('token')
        //回到登录界面
        location.href = '/login.html'
        
        //关闭询问框
        layer.close(index);
      });
})



//获取用户信息的函数
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        
        //请求成功之后的函数
        success:function(res){
            //获取用户信息失败
            if(res.status !== 0){
            return layui.layer.msg('获取用户信息失败') 
            }
            //调用函数渲染用户头像
            renderAvatar(res.data)
        },


    })
}

//渲染用户的头像
function renderAvatar(user){
    //拿到用户的昵称或者用户名
    var name = user.nickname||user.username
    console.log(name);
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp&nbsp' + name)

    //按需渲染用户的头像
    if(user.user_pic !== null){
        //渲染图片头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src',user.user_pic)
    }
    if(user.user_pic === null){
        //渲染文本头像
        $('.layui-nav-img').hide()
        //将名字的第一个字母大写
        var first = name[0].toUpperCase()
        //进行填充
        $('.text-avatar').html(first).show()
    }
}