const app = new Vue({
    el: '#app',
    data: {
      errors: [],
      username: null,
      password: null,
      shop_name: null,
      shop_address: null,
      shop_email: null,
      shop_phone: null,
      mch_id: null,
      api_key: null,
    },
    methods: {
      checkForm: function (e) {
        this.errors = [];
  
     
  
        if (!this.username) {
          this.errors.push('用户名不能为空');
        } else if (!this.validUsername(this.username)) {
          this.errors.push('用户名只能输入5-20个 以字母开头、可带数字');
        } 
        else if (!this.password) {
          this.errors.push('密码不能为空');
        } else if (!this.validPassword(this.password)) {
          this.errors.push('密码只能输入6-20个字母、数字、下划线 ');
        }
        else if (!this.shop_name) {
          this.errors.push('店名不能为空');
        } 
        else if (!this.shop_address) {
          this.errors.push('地址不能为空');
        } 
  
        else if (!this.shop_email) {
          this.errors.push('邮件不能为空');
        } else if (!this.validEmail(this.shop_email)) {
          this.errors.push('邮件格式不正确 ');
        }
        else if (!this.shop_phone) {
          this.errors.push('电话号码不能为空');
        } else if (!this.validPhone(this.shop_phone)) {
          this.errors.push('电话号码格式不正确');
        }
        
  
        if (!this.errors.length) {
          return false;
        }
  
        e.preventDefault();
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