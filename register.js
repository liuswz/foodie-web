new Vue({
    el: '#app',
    data: {
        errors: [],
        registDto: {
            username: null,
            password: null,
            shopName: null,
            shopAddress: null,
            shopEmail: null,
            shopPhone: null,
            mchId: null,
            apiKey: null
        }

    },
    methods: {
        register: function (e) {
            this.errors = [];
            if (!this.registDto.username) {
                this.errors.push('用户名不能为空');
            } else if (!this.validUsername(this.registDto.username)) {
                this.errors.push('用户名只能输入5-20个 以字母开头、可带数字');
            }
            else if (!this.registDto.password) {
                this.errors.push('密码不能为空');
            } else if (!this.validPassword(this.registDto.password)) {
                this.errors.push('密码只能输入6-20个字母、数字、下划线 ');
            }
            else if (!this.registDto.shopName) {
                this.errors.push('店名不能为空');
            }
            else if (!this.registDto.shopAddress) {
                this.errors.push('地址不能为空');
            }

            else if (!this.registDto.shopEmail) {
                this.errors.push('邮件不能为空');
            } else if (!this.validEmail(this.registDto.shopEmail)) {
                this.errors.push('邮件格式不正确 ');
            }
            else if (!this.registDto.shopPhone) {
                this.errors.push('电话号码不能为空');
            } else if (!this.validPhone(this.registDto.shopPhone)) {
                this.errors.push('电话号码格式不正确');
            }


            if (!this.errors.length) {
                return false;
            }
            e.preventDefault();
            this.$http.post('http://localhost:9001/consumer/shopdetail/register',  this.registDto, { emulateJSON: true }).then(function (response) {
                console.log(response);
            }, function (res) {
                console.log(res.status);
            });
        },
        validUsername: function (username) {
            var re = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
            return re.test(username);
        },
        validPassword: function (password) {
            var re = /^(\w){6,20}$/;
            return re.test(password);
        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        validPhone: function (phone) {
            var re = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
            return re.test(phone);
        },
           
        
        
    }
})