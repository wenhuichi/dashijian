$(function(){
    //导入layui相关的属性
    var form = layui.form

    //定义密码的验证规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
        ] ,

        samepwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能一致'
            }
        },

        repwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次输入的密码不一致'
            }
        }

    }),

    //监听表单的提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        console.log($('.layui-form').serialize(),);
        //发起请求修改密码
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$('.layui-form').serialize(),
            success:function(res){
                if(res.status != 0){
                     return layer.msg(res.message)
                 }
                 layer.msg('修改密码成功')
        }
    })

})
})