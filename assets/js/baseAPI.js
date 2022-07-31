//每次发出ajax请求就会调用这个函数，
//这个函数中，可以拿到我给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    //再发起真正的ajax请求之前对地址进行拼接
    // options.url = 'http://81.70.13.176:3007' + options.url
    // options.url = 'http://127.0.0.1:3007' + options.url
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

     console.log(options.url);

    //统一为有权限的接口配置请求头
    if(options.url.indexOf('/my') !== -1){
    options.headers = {
        Authorization: localStorage.getItem('token')||''
    }
    }


    //全局统一挂载compelet回调函数
    //无论成功还是失败，都会调用这个函数
    options.complete =  function(res){
        //在compete里面可以通过res.responseJSON
        //拿到服务器响应的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败')
        {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }

    }
})