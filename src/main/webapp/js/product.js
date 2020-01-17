var vm = new Vue({
    el:"#index",
    data:{
        ADMIN: false,
        use:"",
        joinin:false,
        Product:null,
        cartnum:0,
        itemnum:1,
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
        getProduct:function () {
          var product = JSON.parse(sessionStorage.getItem("product"));
            this.Product = product;

        },
        Buyup:function () {
          this.itemnum = this.itemnum+1;
        },
        BuyDown:function () {
            if(this.itemnum>1)
            this.itemnum = this.itemnum-1;
            else
                alert("数量不能低于1");
        },
        Buy:function () {
            sessionStorage.setItem("num",JSON.stringify(this.itemnum));
            window.location.assign("http://localhost:8088/html/buy.html");
        },
        addchart:function () {

            $.ajax({
                // 提交的地址
                url: 'http://localhost:8080/Cart/insert',
                // 提交的方式
                async : false,
                type: 'post',
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify({
                   "pass":this.use.use.pass,
                    "productid":this.Product.id,
                    "count":this.itemnum
                    }
                ),
                // 回调函数
                success: function (data) {  // data接收的就是异步提交返回的结果
                   alert("添加成功")
                    this.cartnum = this.cartnum+1;
                }
            })

        }

    },
    mounted(){
        this.join();
        this.getProduct();
    },
})