var vm = new Vue({
    el: "#index",
    data: {
        list: [],
        use:null,
        name: null,
        region: null,
        address: null,
        post: null,
        phone: null,
        eprovince: null,
        ecity: null,
        edistrict: null,
        addressID:0,
        cartnum:0,
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
        getList: function () {
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
        modify: function () { //修改
            $.ajax({
                // 提交的地址
                url: 'http://localhost:8080/Info/modifyinfo',
                // 提交的方式
                type: 'post',
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify({
                    "pass":this.use.use.pass,
                    "name": this.name, "region": this.eprovince+this.ecity+this.edistrict
                    , "address": this.address,"post":this.post,"phone":this.phone
                }),
                // 回调函数
                success: function (data) {  // data接收的就是异步提交返回的结果
                    window.location.assign("infoadress.html");
                }
            })

        },
        deladders:function (ID) {
            $.ajax({
                // 提交的地址
                url: 'http://localhost:8080/Info/delAddress',
                // 提交的方式
                type: 'post',
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify({
                    "pass":this.use.use.pass,
                    "name": this.name, "region": this.eprovince+this.ecity+this.edistrict
                    , "address": this.address,"post":this.post,"phone":this.phone,"addressID":ID
                }),
                // 回调函数
                success: function (data) {  // data接收的就是异步提交返回的结果
                    window.location.assign("infoadress.html");
                }
            })

        },
        revise:function (address,id) {
            this.name = address.name;
            this.address = address.address;
            this.phone = address.phone;
            this.post = address.post;
            this.addressID = id;
        },
        reviseing:function () {
            $.ajax({
                // 提交的地址
                url: 'http://localhost:8080/Info/updateaddress',
                // 提交的方式
                type: 'post',
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify({
                    "pass":this.use.use.pass,
                    "name": this.name, "region": this.eprovince+this.ecity+this.edistrict
                    , "address": this.address,"post":this.post,"phone":this.phone,"addressID":this.addressID
                }),
                // 回调函数
                success: function (data) {  // data接收的就是异步提交返回的结果
                    window.location.assign("infoadress.html");

                }
            })

        },
        setDefalut:function (item) {
            $.ajax({
                // 提交的地址
                url: 'http://localhost:8080/Info/setDeaflut',
                // 提交的方式
                type: 'post',
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify({
                    "pass":this.use.use.pass,
                    "name": item.name, "region":item.region
                    , "address": item.address,"post":item.post,"phone":item.phone,"addressID":item.addressID,"isdefalut":1
                }),
                // 回调函数
                success: function (data) {  // data接收的就是异步提交返回的结果
                    window.location.assign("infoadress.html");

                }
            })

        }
    },
    created() {
        this.getList();
        this.join();
    }
})