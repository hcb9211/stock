define(function(require, exports, module) {


    var Action = {
        bindEvent : function(){
            $('body').delegate('.js-tap', $.Func.TAP, function(e){
                var handler = $(this).data('handler');
                Action[handler] && Action[handler].call(this);
            })
        },
        init : function(){
            Action.bindEvent();
        }
    }

    module.exports = Action;
});