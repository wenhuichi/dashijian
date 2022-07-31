$(function(){
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //模拟文件文件点击功能
    $('#btnChooseImg').on('click',function(){
        $('#file').click()
    })

    //为文件选择框绑定change事件
    $('#file').on('change',function(e){
        //获取用户上传的文件
        var filelist = e.target.files
        if(filelist.length === 0){
            return layer.msg('请选择照片')
        }
        //得到用户上传的文件
        var file = e.target.files[0]
        //为文件创造一个URL地址
        var newImgURL = URL.createObjectURL(file)
        //更新裁剪区域
        $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
     
    })

    //为确定按钮绑定点击事件
    $('#btnSubmit').on('click',function(){
        //将文件转换成base64格式
        var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        //向服务器传递数据
        $.ajax({
            method:'POST',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL
            },
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户头像失败')
                }
                layer.msg('更换头像成功')
                //父级界面重新渲染头像
                window.parent.getUserInfo()
        }})
    })
})