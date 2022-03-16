$(function() {


    var form = layui.form
        // 验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度必须在1~6个字符之间"
            }
        }
    })


    // 获取用户信息
    initUserInfo()


    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                //获取用户信息成功后的代码
                console.log('获取用户信息成功');
                console.log('用户信息为');
                console.log(res);
                //为表单赋值
                //    调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    //实现提交修改
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
            //发起更改用户信息请求
        console.log($(this).serialize());
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }

                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户信息(实际也调用了该函数，为何显示不了更新后的信息)
                window.parent.getUserInfo()
            }
        })
    })

})