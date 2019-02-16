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
            apiKey: null,
            notice:null,
            photoUrl:null
        }

    },
    methods: {
        look_photo: function (event) {
            var file = $('input[type="file"]')[0].files[0];
            console.log(file);
            var reader = new FileReader();
            //使用该对象读取file文件
            reader.readAsDataURL(file);
            //读取文件成功后执行的方法函数
            reader.onload = function (e) {
                //读取成功后返回的一个参数e，整个的一个进度事件

                $('#imgshow').get(0).src = e.target.result;
            }
        },
        upload_photo: function (event) {

            var file = $('input[type="file"]')[0].files[0];
            var fileExt = file.name.substring(file.name.lastIndexOf("."))
                .toLowerCase();

            if (!this.checkFileExt(fileExt)) {
                alert("您上传的文件不是图片,请重新上传！");
                //img.value = "";
                return;
            } else {

                var photo_name = new Date().getTime() + "" + parseInt(Math.random() * 10000 + 1);
                client.multipartUpload("/shop/" + photo_name, file).then(function (result) {

                    //判断系统
                    var agent = navigator.userAgent.toLowerCase();
                    var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
                    var requestUrl = result.res.requestUrls[0];
                    if (isMac) {
                    
                        console.log(requestUrl);
                        if (requestUrl) {
                            var imgUrl = requestUrl.substring(0,requestUrl.indexOf("?"));
                            this.photoUrl = imgUrl;
                            console.log(imgUrl);


                            alert("上传成功");
                        }
                    }else{
                        if (requestUrl) {
                            this.photoUrl = requestUrl;


                            alert("上传成功");
                        }
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            }

        },
        checkFileExt(ext) {
            if (!ext.match(/.jpg|.gif|.png|.bmp/i)) {
                return false;
            }
            return true;
        },
        register: function (e) {
        
            if (!this.registDto.username) {
                alert('用户名不能为空');
            } else if (!this.validUsername(this.registDto.username)) {
                alert('用户名只能输入5-20个 以字母开头、可带数字');
            }
            else if (!this.registDto.password) {
                alert('密码不能为空');
            } else if (!this.validPassword(this.registDto.password)) {
                alert('密码只能输入6-20个字母、数字、下划线 ');
            }
            else if (!this.registDto.shopName) {
                alert('店名不能为空');
            }
            else if (!this.registDto.shopAddress) {
               alert('地址不能为空');
            }

            else if (!this.registDto.shopEmail) {
                alert('邮件不能为空');
            } else if (!this.validEmail(this.registDto.shopEmail)) {
                alert('邮件格式不正确 ');
            }
            else if (!this.registDto.shopPhone) {
                alert('电话号码不能为空');
            } else if (!this.validPhone(this.registDto.shopPhone)) {
                alert('电话号码格式不正确');
            }else if(!this.registDto.photoUrl){
                alert('图片不能为空');
            }


            
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