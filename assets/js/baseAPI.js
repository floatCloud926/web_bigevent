// 每次调用$.get()、$.post或$.ajax()的时候，会先调用ajaxPrefilter这个函数。在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的Ajax请求前，同一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
        //统一为有权限的接口设置headers请求头

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
            // 不论成功还是失败，最终都会调用complete函数.可以使用res.responseJSON判断是否用户访问主页
        options.complete = function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                // 1.强制清空token(例如，程序员自己输入token,进入首页后便会删去)
                localStorage.removeItem('token')
                    //2.强制跳转回登录页面
                location.href = '/login.html'

            }
        }
    }
})