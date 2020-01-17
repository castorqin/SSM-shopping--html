var Vm = new Vue({
    el: '#index',
    data: {
        flag: false,
        use: "null",
        list: [],
        ADMIN: false,
        product:[],
        categroy:[],
        joinin:false
    },
    methods: {
        join: function () {
            var user = JSON.parse(sessionStorage.getItem("user"));
            this.use = user;
            if (user == null) {
                this.ADMIN = false;
                return false;
            }
            if (user.stats == 1) {
                console.log("登录成功");
                if (user.use.pass == "1550277807")
                    this.ADMIN = true;
                this.joinin = true;
                return true;
            }
            return false;
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
        getCategory:function (str) {
            var list1;
            $.ajax({
                // 提交的地址
                url: 'http://localhost:8080/product/getcate',
                // 提交的方式
                async : false,
                type: 'post',
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                data: str,
                // 回调函数
                success: function (data) {  // data接收的就是异步提交返回的结果
                    list1 = data;
                }
            })
            if(str=="2")
            this.categroy = list1;
            else
                this.list = list1;
        },
        getProduct:function () {
            var list1;
            $.ajax({
                // 提交的地址
                url: 'http://localhost:8080/product/getproduct',
                // 提交的方式
                async : false,
                type: 'post',
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                data: null,
                // 回调函数
                success: function (data) {  // data接收的就是异步提交返回的结果
                    list1 = data;
                }
            })
            this.product = list1;
        },
        Goproduct:function (i) {
            sessionStorage.removeItem("product");
            sessionStorage.setItem("product",JSON.stringify(i));
        }
    },
    mounted() {
        this.join();
        this.getCategory("1");
        this.getCategory("2");
        this.getProduct();
    }
});
