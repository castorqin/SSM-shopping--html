var Vm = new Vue({
    el: '#index',
    data: {
        flag: false,
        use:"",
        list: [1, 2, 3, 4, 5],
        ADMIN: false,
        name:null,
        phone:null,
        email:null,
        card:null,
        joinin:false,
        head:"http://localhost:8088/pic/8489ef4623c0460fae728d9a707d6b2a.jpg"
    },
    methods: {
        join: function () {
            var user = JSON.parse(sessionStorage.getItem("user"));
            this.use = user;
            if (user == null) {
                this.ADMIN = false;
                return false;
            }
            if (user.stats == true) {
                console.log("登录成功");
                if (user.use.pass == "1550277807")
                    this.ADMIN = true;
                if(user.use.headimg!=null)
                {
                    this.head = user.use.headimg;
                }
                this.joinin = true;

            }
        },
        logout: function () {
            sessionStorage.removeItem("user");
            window.location.assign("http://localhost:8088/index.html");

        },
        shopchart:function () {
            if(this.use==null)
            {
                alert("请先登录");
                return false;
            }
        },
        modify:function (user) {

          this.name = user.name;

          this.phone = user.phone;

          this.email = user.email;
        },
        modifying:function () {
            $.ajax({
                // 提交的地址
                url: 'http://localhost:8080/USER/update',
                // 提交的方式
                type: 'post',
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify({
                    "pass":this.use.use.pass,
                    "password":this.use.use.password,
                    "name": this.name,"phone":this.phone ,"headimg":this.head
                    ,"email":this.email
                }),
                // 回调函数
                success: function (data) {  // data接收的就是异步提交返回的结果
                    sessionStorage.removeItem("user");
                    sessionStorage.setItem("user",JSON.stringify(data));
                    window.location.assign("info.html");
                }
            })


        },
        updateimg:function () {
            var formData = new FormData($('#headxiu')[0]);//序列化表单，将上传类型设置为文件对象
            var str;
            $.ajax({
                type: 'post',
                url: 'http://localhost:8080/USER/updateimg',
                data: formData,
                async : false,
                cache: false,//文件不设置缓存
                processData: false,//数据不被转换为字符串
                contentType: false,//上传文件时使用，避免 JQuery 对其操作
                success: function (data) {  // data接收的就是异步提交返回的结果
                  str = data;
                  alert("图片上传成功");
                }

            })
           this.head = str;
        },
    },
    mounted() {
     this.join();
    }
});
