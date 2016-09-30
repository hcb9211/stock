$.all = {
  TAP : 'ontouchstart' in window ? 'tap' : 'click',
  getParm: function(param){
      var search = location.search.substring(1);
      var arr = search.split('&');
      for(var i=0,j=arr.length; i<j; i++){
          var arr1 = arr[i].split('=');
          if(arr1[0] == param){
              return arr1[1];
          }
      }
  },
  ajax : function(param, fn){
      var url = 'http://app.api.gupiaoxianji.com/v3.6';
      $.ajax({
          url: url,
          type: "POST",
          contentType: "application/json",
          dataType : 'json',
          data: JSON.stringify(param),
          success: function(res){
              $.isFunction(fn) && fn(res);
          },
          error: function(res){
              console.log(res);
          }
      });
  },
  checkPhone: function(phone){
      phone = phone.replace(/(^\s+)|(\s+$)/g, '');

      //判断手机是否正确
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if(!myreg.test(phone))
      {
          return false;
      }
      return phone;
  },
    /**
     * [isMobile 判断平台]
     * @param test: 0:iPhone    1:Android
     */
    /*isMobile:function (test) {
        var u = navigator.userAgent, app = navigator.appVersion;
        if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
            if(window.location.href.indexOf("?mobile")<0){
                try{
                    if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
                        return '0';
                    }else{
                        return '1';
                    }
                }catch(e){}
            }
        }else if( u.indexOf('iPad') > -1){
            return '0';
        }else{
            return '1';
        }
    },*/
    isMobile:function () {
        var u = navigator.userAgent;
        if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){
            //android终端
            $(".invitecode").css({ '-ms-user-select':'element'})
        }else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ){
            //ios终端
            $(".invitecode").css({ '-ms-user-select':'element'})
        }else{

        }
    }
};

var Index = {
  //刷新微信顶部title。方便转发
  setWXTitle: function(nickname){
      document.title = '好友' + nickname + '邀请你加入股票先机！';
      var $body = $('body');

      var $iframe = $('<iframe src="/favicon.ico"></iframe>');
      $iframe.on('load',function() {
          setTimeout(function() {
              $iframe.off('load').remove();
          }, 0);
      }).appendTo($body);
  },
  //获取邀请码
  getInviteCode: function(userid){
    var param = {
        "jsonrpc": "2.0",
        "method": "User.Invite",
        "id": 54321,
        "params" : {
            "userid": userid
        }
    };
    $.all.ajax(param, function(res){
      var result = res.result;
      if(result){
        $('#inviteCode').val(result.invite_code);
      }
    })
  },
  //获取用户信息（头像、名字）
  getUserInfo: function(userid){
    var param = {
        "jsonrpc": "2.0",
        "method": "User.Info",
        "id": 54321,
        "params" : {
            "userid": userid
        }
    };
    $.all.ajax(param, function(res){
      var result = res.result;
      if(result){
        var html = template('body-template', result);
        $('#container').html(html);
        Index.setWXTitle(result.nickname);
        Index.getInviteCode(userid);
      }
    })
  },
  init: function(){
    var userid = $.all.getParm('userid');
        userid = $.all.checkPhone(userid);

    if(userid){
      this.getUserInfo(userid);
    }
  }
}

Index.init();
