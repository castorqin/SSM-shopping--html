var Vm = new Vue({
    el: '#cart',
    data: {
        flag: false,
        use: "null",
        list: [1, 2, 3, 4, 5],
        ADMIN: false,
        cartinfo:"null",
        cartnum:0,
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
                return true;
            }
            return false;
        },
        logout: function () {
            sessionStorage.removeItem("user");
            this.join();
        },
        getcart:function () {
            var cart = sessionStorage.getItem("cart");
             this.cartinfo = cart;

        }
    },
    mounted() {
        this.test;
        this.getcart();
    }
});
