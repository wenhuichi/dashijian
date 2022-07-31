$(function() {
    //导入layui相关组件
    var layer = layui.layer
    var form = layui.form
// 规定用户昵称的自定义规则
    form.verify({
        nickname:function(value){
            if(value.length > 6)
            return '昵称长度不能超过6个字符'
        }
    })

initUserInfo()

    //初始化用户基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status != 0)
                return layer.msg('获取用户信息失败')
                
                //成功用户信息后
                console.log(res);
                //调用from.val快速为表单赋值
                form.val('forUserInfo',res.data)
            }
        })
    }

    //重置表单内容
    $('#btnReset').on('click',function(e){
        //阻止默认行为
        e.preventDefault();
        //重新调用函数进行填写
        initUserInfo()
    })

    //监听表单提交事件
    $('#btnSubmit').on('click',function(e){
        //阻止表单默认提交行为
        e.preventDefault()
        //发起AJAX请求修改数据
        console.log($('.layui-form').serialize());
        $.ajax({
           method:'POST',
           url:'/my/userinfo',
           data:$('.layui-form').serialize(),
           success:function(res){
               if(res.status != 0){
                    return layer.msg(res.message)
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
           }
        })
    })
})