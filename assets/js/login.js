$(function() {
    // 点击进行注册的链接
    $('#link_reg').on('click', function() {
        $('.loginBox').hide();
        $('.regBox').show();
    });
    // 去登陆的链接
    $('#link_login').on('click', function() {
        $('.loginBox').show();
        $('.regBox').hide();
    });
    // 从 layui 中获取 form 对象
    var form = layui.form;
    // 从 layui 中获取 layer 对象
    var layer = layui.layer;
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 定义了一个pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: function(value) {
            // 拿到确认密码框的值
            // 拿到输入密码框的值
            // 进行等号判断
            // 如果不一样就return提示消息
            var repassword = $('.regBox [name=password]').val();
            if (repassword !== value) {
                return '两次输入的密码不一致!';
            }
        }
    });

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止表单默认提交行文
        e.preventDefault();
        // 发起 post 请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.status);
            }
            layer.msg('注册成功!可以进行登录。');
            //模拟人的点击行为
            $('#link_login').click();
        });
    });
    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发起 ajax.POST 请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！');
                // console.log(res.token);
                // 把登录成功之后的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token);
                // 登录成功之后跳转到后台主页
                location.href = './index.html';
            }
        })
    });
})