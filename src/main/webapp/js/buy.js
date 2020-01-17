var VN = new Vue({
    el:'#index',
    data:{
        use: null,
        joinin:false,
        ADMIN: false,
        Product:null,
        itemnum:1,
        list:[]
    },
    methods:{
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
        getorder:function () {
            this.Product = JSON.parse(sessionStorage.getItem("product"));
            this.itemnum = JSON.parse(sessionStorage.getItem("num"));

        },
        getaddress: function () {
            var user = JSON.parse(sessionStorage.getItem("user"));
            var list1;
            $.ajax({
                // 提交的地址
                url: 'http://localhost:8080/Info/getaddress',
                // 提交的方式
                type: 'post',
                dataType: "json",
                async: false,
                contentType: 'application/json;charset=utf-8',
                data: user.use.pass,
                // 回调函数
                success: function (data) {  // data接收的就是异步提交返回的结果
                    list1 = data;
                }
            });
            this.list = list1;
        },
    },
    mounted(){
        this.join();
        this.getorder();
        this.getaddress();
    }
})