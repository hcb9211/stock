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
      var url = 'http://app.api.gupiaoxianji.com/test';
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
  }

};

var Index = {
  //刷新微信顶部title。方便转发
  setWXTitle: function(nickname){
      // document.title = '好友' + nickname + '邀请你加入股票先机！';
      document.title='股票先机，跟庄炒股跑赢大盘';
      var $body = $('body');

      var $iframe = $('<iframe src="/favicon.ico">注册就送60%收益率的组合跟投服务。</iframe>');
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
        $('#inviteCode').html(result.invite_code);
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
;
