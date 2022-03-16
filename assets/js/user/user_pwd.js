$(function() {
    var form = layui.form
    form.verify({
            //  自定义了一个叫做pwd的校验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 校验新旧密码是否一致的规则
            repwd1: function(value) {
                //   通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('[name=oldPwd]').val()
                if (pwd === value) {
                    return "新旧密码相同,请更换！";
                }
            },
            // 校验新密码两次是否一致的规则
            repwd2: function(value) {
                //   通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('[name=newPwd]').val()
                if (pwd !== value) {
                    return "两次密码不一致！";
                }
            }
        })
        // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault()
            //发起ajax的post请求
        console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
                    //将表单转为原生元素，再重置
                $('.layui-form')[0].reset()
            }
        })
    })

})