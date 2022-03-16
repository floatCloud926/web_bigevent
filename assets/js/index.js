$(function() {
        getUserInfo()
        var layer = layui.layer

        //点击按钮，实现退出功能
        $('#btnLogout').on('click', function() {
            // 提示用户是否确认退出
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //1.清空本地存储中的token
                localStorage.removeItem('token')
                    //2.跳转回登录页面
                location.href = '/login.html'

                //关闭询问框
                layer.close(index);
            });
        })

    })
    //获取用户的基本信息
function getUserInfo() {
    // 这里的代码没问题，只是请求得太慢了。还有可能请求不上
    $.ajax({
        methods: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象，给予权限
        /*   headers: {
              Authorization: localStorage.getItem('token') || ''
          }, */
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        }

    })
}

function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
        // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1渲染图像头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文本图像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}