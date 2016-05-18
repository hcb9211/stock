define(function(require, exports, module) {


    var Action = {
        bindEvent : function(){
            $('body').delegate('.js-tap', 'click', function(e){
                var handler = $(this).data('handler');
                Action[handler] && Action[handler].call(this);
            })
        },
        checkPhone: function(){
            var phone = $('#phone').val();
            phone = phone.replace(/(^\s+)|(\s+$)/g, '');

            //判断手机是否正确
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if(!myreg.test(phone))
            {
                return false;
            }
            return phone;
        },
        checkSmsCode: function(){
            var smsCode = $('#smsCode').val();
            smsCode = smsCode.replace(/(^\s+)|(\s+$)/g, '');
            if(!smsCode){
                return false;
            }
            return smsCode;
        },
        //发送验证码
        getSmsCode: function(){
            var that = this;
            var phone = Action.checkPhone();
            if(!phone){
                $.Func.pop('请输入有效的手机号码！');
                return false;
            }

            var param = {
                "jsonrpc": "2.0",
                "method": "User.CheckRegist",
                "id": 54321,
                "params" : {
                    "userid": phone,
                    "openid": "",
                    "unionid": ""
                }
            };
            $.Func.ajax(param, function(data){
                var result = data;
                if(result.error && result.error.code == 101){
                    var disabled = $(that).attr('disabled');
                    if(!disabled){
                        var seconds = 60;
                        $(that).addClass('disabled').attr('disabled', 'disabled').html(seconds + 's后重新获取');
                        var timer = setInterval(function(){
                            seconds--;
                            if(seconds>0){
                                $(that).html(seconds +'s后重新获取');
                            }else{
                                $(that).removeClass('disabled').removeAttr('disabled').html('重新发送');
                                clearInterval(timer);
                                null;
                            }
                        }, 1000);
                    }
                }else{
                    $.Func.pop('该用户已注册!');
                }
            })

        },
        bindWeixin: function(phone){
            var param = {
                "jsonrpc": "2.0",
                "method": "User.BindWeixin",
                "id": 54321,
                "params" : {
                    "userid": phone
                }
            };
            $.Func.ajax(param, function(data){

            })
        },
        closeLayer: function(){
            $('#layer').removeClass('show');
        },
        submit: function(){
            var phone = Action.checkPhone();
            var smsCode = Action.checkSmsCode();
            if(!phone){
                $.Func.pop('请输入有效的手机号码！');
                return false;
            }
            if(!smsCode){
                $.Func.pop('请输入验证码！');
                return false;
            }
        },
        init : function(){
            Action.bindEvent();
        }
    }

    module.exports = Action;
});