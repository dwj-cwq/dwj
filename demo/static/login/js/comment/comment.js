<!--textarea高度自适应-->

    $(function () {
        $('.content').flexText();
    });

<!--textarea限制字数-->

    function keyUP(t){
        var len = $(t).val().length;
        if(len > 139){
            $(t).val($(t).val().substring(0,140));
        }
    }

<!--点击评论创建评论条-->

    $('.item_msg').on('click','.plBtn',function(){
        var that = this
        var username = $('.user').html()//当前用户
        var userid = $('.userid').html()//当前用户id
        var blogid = $(this).parents('.reviewArea').parents('.commentAll1').parents('.comment-show-con-list').parents('.comment-show').parents('.commentAll').siblings('.mess').find('.blogid').html()
        var myDate = new Date();
        //获取当前年
        var year=myDate.getFullYear();
        //获取当前月
        var month=myDate.getMonth()+1;
        //获取当前日
        var date=myDate.getDate();
        var h=myDate.getHours();       //获取当前小时数(0-23)
        var m=myDate.getMinutes();     //获取当前分钟数(0-59)
        if(m<10) m = '0' + m;
        var s=myDate.getSeconds();
        if(s<10) s = '0' + s;
        var now=year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
        //获取输入内容
        var oSize = $(this).siblings('.flex-text-wrap').find('.comment-input').val();
        console.log(oSize);
        //动态创建评论模块
         $.get("/demo/addcomment/", {comment_content:oSize, comment_time:now, user_id:userid, blog_id:blogid}, function(res, status){
              oHtml = '<div class="comment-show-con clearfix"><div class="comment-show-con-img pull-left"><img src="/static/login/images/comment-images/header-img-comment_03.png" alt=""></div> <div class="comment-show-con-list1 pull-left clearfix"><div class="pl-text clearfix"> <a href="#" class="comment-size-name">'+ username +': </a> <span class="my-pl-con">&nbsp;'+ oSize +'</span><span class="commentid" hidden></span></div> <div class="date-dz"> <span class="date-dz-left pull-left comment-time">'+ now +'</span> <div class="date-dz-right pull-right comment-pl-block"><a href="javascript:;" class="removeBlock">删除</a> <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a> <span class="pull-left date-dz-line">|</span> <a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a> </div> </div><div class="hf-list-con"></div></div> </div>';
             if(oSize.replace(/(^\s*)|(\s*$)/g, "") != ''){
                 $(that).parents('.reviewArea ').siblings('.comment-show').prepend(oHtml);
                 $(that).siblings('.flex-text-wrap').find('.comment-input').prop('value','').siblings('pre').find('span').text('');
             }
         });

    });

<!--点击回复动态创建回复块-->

    $('.item_msg').on('click','.pl-hf',function(){
        var that = this
        var username = $('.user').html()//当前用户
        var blogid = $(that).parents('.date-dz-right').parents('.date-dz').parents('.comment-show-con-list').parents('.comment-show').parents('.commentAll').siblings('.mess').find('.blogid').html()

        $.get("/demo/getcomment/", {blog_id:blogid}, function(res, status){
            var comment=JSON.parse(res)//转化为jason对象
             for(var i = 0; i < comment.length; i++)
            {
                var comment_content = comment[i].fields.content
                oHtml = '<div class="comment-show-con clearfix"><div class="comment-show-con-img pull-left"><img src="images/header-img-comment_03.png" alt=""></div> <div class="comment-show-con-list1 pull-left clearfix"><div class="pl-text clearfix"> <a href="#" class="comment-size-name">'+ username +' : </a> <span class="my-pl-con">&nbsp;'+ comment_content +'</span> <span class="commentid" hidden>'+ comment[i].pk +'</span></div> <div class="date-dz"> <span class="date-dz-left pull-left comment-time"> now </span> <div class="date-dz-right pull-right comment-pl-block"><a href="javascript:;" class="removeBlock">删除</a> <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a> <span class="pull-left date-dz-line">|</span> <a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a> </div> </div><div class="hf-list-con"></div></div> </div>';
                $(that).parents('.date-dz-right').siblings('.commentAll1').find('.comment-show').prepend(oHtml);
            }
        });

        //获取回复人的名字
        var fhName = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.pl-text').find('.comment-size-name').html();
        var comment = $("#comment").html

        //回复@
        var fhN = '回复@'+fhName;
        //var oInput = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.hf-con');
        var fhHtml = ' <div class="commentAll1 col-sm-10 col-xs-10">\n' +
            '                            <!--评论区域 begin-->\n' +
            '                            <div class="reviewArea clearfix">\n' +
            '                                <textarea class="content comment-input" placeholder="Please enter a comment&hellip;" onkeyup="keyUP(this)"></textarea>\n' +
            '                                <a href="javascript:;" class="plBtn">评论</a>\n' +
            '                            </div>\n' +
            '                            <!--评论区域 end-->\n' +
            '                            <!--回复区域 begin-->\n' +
            '                            <div class="comment-show">\n' +
            // '                                <div class="comment-show-con clearfix">\n' +
            // '                                    <div class="comment-show-con-img pull-left"><img src="images/header-img-comment_03.png" alt=""></div>\n' +
            // '                                    <div class="comment-show-con-list1 pull-left clearfix">\n' +
            // '                                        <div class="pl-text clearfix">\n' +
            // '                                            <a href="#" class="comment-size-name">张三 : </a>\n' +
            // '                                            <span class="my-pl-con">&nbsp;</span>\n' +
            // '                                        </div>\n' +
            // '                                        <div class="date-dz">\n' +
            // '                                            <span class="date-dz-left pull-left comment-time">2017-5-2 11:11:39</span>\n' +
            // '                                            <div class="date-dz-right pull-right comment-pl-block">\n' +
            // '                                                <a href="javascript:;" class="removeBlock">删除</a>\n' +
            // '                                                <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a>\n' +
            // '                                                <span class="pull-left date-dz-line">|</span>\n' +
            // '                                                <a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a>\n' +
            // '                                            </div>\n' +
            // '                                        </div>\n' +
            // '                                        <div class="hf-list-con"></div>\n' +
            // '                                    </div>\n' +
            // '                                </div>\n' +
            '                            </div>\n' +
            '                            <!--回复区域 end-->\n' +
            '                        </div>';
        //显示回复
        if($(this).is('.hf-con-block')){
            $(this).parents('.date-dz-right').parents('.date-dz').append(fhHtml);
            $(this).removeClass('hf-con-block');
            $('.content').flexText();
            $(this).parents('.date-dz-right').siblings('.commentAll1').find('.pre').css('padding','6px 15px');
            //console.log($(this).parents('.date-dz-right').siblings('.hf-con').find('.pre'))
            //input框自动聚焦
            $(this).parents('.date-dz-right').siblings('.commentAll1').find('.comment-input').val('').focus().val(fhN);

        }else {
            $(this).addClass('hf-con-block');
            $(this).parents('.date-dz-right').siblings('.commentAll1').remove();
        }
    });

<!--评论回复-->

    $('.item_msg').on('click','.hf-pl',function(){
        var oThis = $(this);
        var myDate = new Date();
        //获取当前年
        var year=myDate.getFullYear();
        //获取当前月
        var month=myDate.getMonth()+1;
        //获取当前日
        var date=myDate.getDate();
        var h=myDate.getHours();       //获取当前小时数(0-23)
        var m=myDate.getMinutes();     //获取当前分钟数(0-59)
        if(m<10) m = '0' + m;
        var s=myDate.getSeconds();
        if(s<10) s = '0' + s;
        var now=year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
        //获取输入内容
        var oHfVal = $(this).siblings('.flex-text-wrap').find('.hf-input').val();
        console.log(oHfVal)
        var oHfName = $(this).parents('.hf-con').parents('.date-dz').siblings('.pl-text').find('.comment-size-name').html();
        var oAllVal = '回复@'+oHfName;
        if(oHfVal.replace(/^ +| +$/g,'') == '' || oHfVal == oAllVal){

        }else {
            $.getJSON("json/pl.json",function(data){
                var oAt = '';
                var oHf = '';
                $.each(data,function(n,v){
                    delete v.hfContent;
                    delete v.atName;
                    var arr;
                    var ohfNameArr;
                    if(oHfVal.indexOf("@") == -1){
                        data['atName'] = '';
                        data['hfContent'] = oHfVal;
                    }else {
                        arr = oHfVal.split(':');
                        ohfNameArr = arr[0].split('@');
                        data['hfContent'] = arr[1];
                        data['atName'] = ohfNameArr[1];
                    }

                    if(data.atName == ''){
                        oAt = data.hfContent;
                    }else {
                        oAt = '回复<a href="#" class="atName">@'+data.atName+'</a> : '+data.hfContent;
                    }
                    oHf = data.hfName;
                });

                var oHtml = '<div class="all-pl-con"><div class="pl-text hfpl-text clearfix"><a href="#" class="comment-size-name">我的名字 : </a><span class="my-pl-con">'+oAt+'</span></div><div class="date-dz"> <span class="date-dz-left pull-left comment-time">'+now+'</span> <div class="date-dz-right pull-right comment-pl-block"> <a href="javascript:;" class="removeBlock">删除</a> <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a> <span class="pull-left date-dz-line">|</span> <a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a> </div> </div></div>';
                oThis.parents('.hf-con').parents('.comment-show-con-list').find('.hf-list-con').css('display','block').prepend(oHtml) && oThis.parents('.hf-con').siblings('.date-dz-right').find('.pl-hf').addClass('hf-con-block') && oThis.parents('.hf-con').remove();
            });
        }
    });

<!--删除评论块-->

    $('.commentAll').on('click','.removeBlock',function(){
        var that = this
        var commentid = $(that).parents('.date-dz-right').parents('.date-dz').parents('.comment-show-con-list1').find('.commentid').html()
        $.get("/demo/delcomment/", {comment_id:commentid}, function(res, status){
            var oT = $(that).parents('.date-dz-right').parents('.date-dz').parents('.all-pl-con');
            if(oT.siblings('.all-pl-con').length >= 1){
                oT.remove();
            }else {
                $(that).parents('.date-dz-right').parents('.date-dz').parents('.all-pl-con').parents('.hf-list-con').css('display','none')
                oT.remove();
            }
            $(that).parents('.date-dz-right').parents('.date-dz').parents('.comment-show-con-list1').parents('.comment-show-con').remove();
        });
    });

// <!--点赞-->

    $('.item_msg').on('click','.date-dz-z',function(){
        var zNum = $(this).find('.z-num').html();
        if($(this).is('.date-dz-z-click')){
            zNum--;
            $(this).removeClass('date-dz-z-click red');
            $(this).find('.z-num').html(zNum);
            $(this).find('.date-dz-z-click-red').removeClass('red');
        }else {
            zNum++;
            $(this).addClass('date-dz-z-click');
            $(this).find('.z-num').html(zNum);
            $(this).find('.date-dz-z-click-red').addClass('red');
        }
    });
