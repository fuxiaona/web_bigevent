$(function(){
//一、监听点击事件
   //1.监听登录中的a链接
   $(' #link_reg').click(function(){
       $('.login-box').hide();
       $('.reg-box').show();
   });
   //2.监听注册中的a链接
   $(' #link_login').click(function(){
    $('.reg-box').hide();
    $('.login-box').show();
});
//二、自定义表单验证规则
    // 从layui中获取form对象
    var form = layui.form;
    form.verify({
        
        //1. 自定义了一个叫做pwd的校验规则
       
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        //2. 校验两次密码是否一致的规则
        repwd: function(value){
            // 通过形参拿到的是确认密码框中的值
            //还需要拿到密码框中的值
            var pwd = $('.reg-box [name=password]').val();
            //判断再次确认的密码与获取的密码是否一致
            if(value !== pwd){
                return "两次密码不一致";
            }
        }
      }); 
      var layer = layui.layer;
      //监听注册表单的提交事件
      $('#form_reg').on('submit',function(e){
        e.preventDefault();
       
       var data = {
           username: $('#form_reg [name="username"]').val(),
           password: $('#form_reg [name="password"]').val()
       };
       $.post('/api/reguser',data,function(res){
           if(res.status !== 0){
               return layer.msg(res.message);
           }
           layer.msg('注册成功，请登录！');
           //模拟人的点击事件
           $(' #link_login').click();
       })
      }) 
      //发起登录的ajax请求
      $('#form-login').submit(function(e){
           e.preventDefault();
           $.ajax({
               method: 'POST',
               url:'/api/login',
               data:$(this).serialize(),
               success:function(res){
                  if(res.status !== 0){
                      return layer.msg('登录失败！')
                  }
                  layer.msg('登录成功！')
                  //将登录成功得到的token字符串保存到本地存储localStorage中
                  localStorage.setItem('token',res.token);
                  //跳转到后台主页
                  location.href = '/index.html'
               }

           })
      })


})