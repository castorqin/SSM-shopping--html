var VM = new Vue({
    el: ".index",
    data: {

        phoneid: null,
        code: null,
        repeatpassword: null,
        password: null,
        name: null,
        pass:null,
        incode: null,
    },
    methods: {
        testphone: function (str) {
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            var code="aaa";
            if (!myreg.test(str)) {
                alert("手机账号格式错误")
                return false;
            } else {
                $.ajax({
                    // 提交的地址
                    url: 'http://localhost:8080/USER/registbyphone',
                    // 提交的方式
                    async : false,
                    type: 'post',
                    dataType: "json",
                    contentType: 'application/json;charset=utf-8',
                    data: JSON.stringify(str),
                    // 回调函数
                    success: function (data) {  // data接收的就是异步提交返回的结果
                        code = data;
                    }
                })
            }
            this.code =code;
        },
        f: function () {
            if (this.repeatpassword != this.password) {
                alert("两次输入的密码不一致");
                return false;
            }
            if (this.password == "" || this.name == "") {
                alert("用户名或密码为空");
                return false;
            }
            if (this.code==this.incode) {
                $.ajax({
                    // 提交的地址
                    url: 'http://localhost:8080/USER/regist',
                    // 提交的方式
                    type: 'post',
                    dataType: "json",
                    contentType: 'application/json;charset=utf-8',
                    data: JSON.stringify({
                        "pass": this.pass, "password": this.password
                        , "name": this.name,"phone":this.phoneid
                    }),
                    // 回调函数
                    success: function (data) {  // data接收的就是异步提交返回的结果

                        if (data.stats == 1) {
                            alert(data.stats + "点击确定跳转登录界面");
                            window.location.assign("http://localhost:8088/html/login.html");
                        }
                        else if(data.stats==0){
                            alert("账号已经存在");
                        }
                        else{
                            alert("手机账号已经绑定，请重新绑定");
                        }

                    }
                })
            }
           else alert("短信验证码出错");
        }
    }
})