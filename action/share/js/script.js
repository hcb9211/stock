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

//  config接口注入权限验证配置
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxe031013412e9afdb', // 必填，公众号的唯一标识
    timestamp:1465445458, // 必填，生成签名的时间戳
    nonceStr: 'i3WvKMSFPB1UtYOmnurMh4597f4SQIvf', // 必填，生成签名的随机串
    signature: 'f4d90daf4b3bca3078ab155816175ba34c443a7b',// 必填，签名，见附录1
    jsApiList: [
        onMenuShareTimeline,
        onMenuShareAppMessage,
        onMenuShareQQ,
        onMenuShareWeibo,
        onMenuShareQZone,
        startRecord,
        stopRecord,
        onVoiceRecordEnd,
        playVoice,
        pauseVoice,
        stopVoice,
        onVoicePlayEnd,
        uploadVoice,
        downloadVoice,
        chooseImage,
        previewImage,
        uploadImage,
        downloadImage,
        translateVoice,
        getNetworkType,
        openLocation,
        getLocation,
        hideOptionMenu,
        showOptionMenu,
        hideMenuItems,
        showMenuItems,
        hideAllNonBaseMenuItem,
        showAllNonBaseMenuItem,
        closeWindow,
        scanQRCode,
        chooseWXPay,
        openProductSpecificView,
        addCard,
        chooseCard,
        openCard
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
//  获取“分享给朋友”按钮点击状态及自定义分享内容接口
wx.onMenuShareAppMessage({
    title: '股票先机，跟庄炒股跑赢大盘', // 分享标题
    desc: '注册就送60%收益率的组合跟投服务。', // 分享描述
    link: 'http://res.gupiaoxianji.com/testTmp/share/index.html?userid=13826595952', // 分享链接
    imgUrl: 'http://wx.gupiaoxianji.com/gzh/nxbtestdev/web/res/img/global/logo.png', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});
//  获取“分享到QQ”按钮点击状态及自定义分享内容接口
wx.onMenuShareQQ({
    title: '股票先机，跟庄炒股跑赢大盘', // 分享标题
    desc: '注册就送60%收益率的组合跟投服务。', // 分享描述
    link: 'http://res.gupiaoxianji.com/testTmp/share/index.html?userid=13826595952', // 分享链接
    imgUrl: 'http://wx.gupiaoxianji.com/gzh/nxbtestdev/web/res/img/global/logo.png', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});
//  获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
wx.onMenuShareQZone({
    title: '股票先机，跟庄炒股跑赢大盘', // 分享标题
    desc: '注册就送60%收益率的组合跟投服务。', // 分享描述
    link: 'http://res.gupiaoxianji.com/testTmp/share/index.html?userid=13826595952', // 分享链接
    imgUrl: 'http://wx.gupiaoxianji.com/gzh/nxbtestdev/web/res/img/global/logo.png', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});