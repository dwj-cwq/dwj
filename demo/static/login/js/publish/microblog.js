//发布栏功能
$(function(){

    $("#content").keyup(function(){

        //判断输入的字符串长度
        var content_len = $("#content").text().replace(/\s/g,"").length;

        $(".tips").text("已经输入"+content_len+"个字");


        if(content_len==0){
            // alert(content);
            $(".tips").text("");
            $("#send").addClass("disabled");
            return false;
        }else{
            $("#send").removeClass("disabled");
        }
    });

    $(".pic").click(function(){

        $(".select_Img").click();


    })

    function updateimg(){
        var img = $(".select_Img").files[0]
        if(img)
        {
            var r= new FileReader();
            r.readAsDataURL(data.files[0]);
            r.onload=function(e) {
                $('.preview').attr("src", this.return)
            };
        }
    }


    //点击按钮发送内容
    $("#send").click(function(){

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
        var blogtime=year+'-'+month+"-"+date+" "+h+':'+m+":"+s;

        var content=$("#content").html();//发布内容
        var username = $('.user').html()//当前用户
        var userid = $('.userid').html();//当前用户id
        var file_obj = $(".select_Img")[0].files[0];
        alert("找到了")


        alert(content)
        var content1 = content
        if(content1.indexOf("<div>") >= 0) {
            content1 = content1.split("<div>")[0]
        }
        else{
            content1 = content1.substring(1,5)
        }

        var fd = new FormData();
        fd.append("blog_img", file_obj);
        fd.append("blog_content", content);
        fd.append("user_id", userid);
        fd.append("blog_time", blogtime);
        fd.append("blog_title", content1);

        //判断选择的是否是图片格式
        var imgPath = $(".imgPath").text();
        var start  = imgPath.lastIndexOf(".");
        var postfix = imgPath.substring(start,imgPath.length).toUpperCase();

        $.ajax({
                type: 'POST',
                url: '/demo/addblog/',
                data: fd,
                dataType:'JSON',
                contentType: false,    //不可缺
                processData: false,    //不可缺
                success: function (arg) {
                    alert(arg)
                    if(arg == "noimg"){


                            $(".item_msg").prepend("<div class=\"col-sm-12 col-xs-12 message clearfix\" >\n" +
                                    "                        <img src=\"/static/login/images/img/icon.png\" class=\"col-sm-2 col-xs-2\" style=\"border-radius: 50%\">\n" +
                                    "                        <div class=\"col-sm-10 col-xs-10 clearfix\">\n" +
                                    "                            <span style=\"font-weight: bold;\">"+username+"</span>\n" +
                                    "                            <div class=\"dropdown location\">\n" +
                                    "                                <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n" +
                                    "                                    设置 <b class=\"caret\"></b>\n" +
                                    "                                </a>\n" +
                                    "                                <ul class=\"dropdown-menu\">\n" +
                                    "                                    <li><a href=\"javascript:;\" class=\"del\">删除</a></li>\n" +
                                    "                                    <li><a href=\"javascript:;\" class=\"set\">编辑</a></li>\n" +
                                    "                                </ul>\n" +
                                    "                            </div>\n" +
                                    "                            <br>\n" +
                                    "                            <small class=\"date\" style=\"color:#999\">1分钟前</small>\n" +
                                    "                            <div class=\"msg_content\">"+content+"</div>\n" +
                                    "                        </div>\n" +
                                    "\n" +
                                    "                        <!--评论-->\n" +
                                    "                        <div class=\"commentAll col-sm-12 col-xs-12\">\n" +
                                    "                            <div class=\"comment-show\">\n" +
                                    "                                <div class=\"comment-show-con-list pull-left clearfix\">\n" +
                                    "                                    <div class=\"date-dz\">\n" +
                                    "                                        <span class=\"date-dz-left pull-left comment-time\">2017-5-2 11:11:39</span>\n" +
                                    "                                        <div class=\"date-dz-right pull-right comment-pl-block\">\n" +
                                    "                                            <a href=\"javascript:;\" class=\"removeBlock\">删除</a>\n" +
                                    "                                            <a href=\"javascript:;\" class=\"date-dz-pl pl-hf hf-con-block pull-left\">回复</a>\n" +
                                    "                                            <span class=\"pull-left date-dz-line\">|</span>\n" +
                                    "                                            <a href=\"javascript:;\" class=\"date-dz-z pull-left\"><i class=\"date-dz-z-click-red\"></i>赞 (<i class=\"z-num\">666</i>)</a>\n" +
                                    "                                        </div>\n" +
                                    "                                    </div>\n" +
                                    "                                    <div class=\"hf-list-con\"></div>\n" +
                                    "                                </div>\n" +
                                    "                            </div>\n" +
                                    "                            <!--回复区域 end-->\n" +
                                    "                        </div>\n" +
                                    "                        <!--评论-->\n" +
                                    "\n" +
                                    "                    </div>");

                    }else{
                        $(".item_msg").prepend("<div class=\"col-sm-12 col-xs-12 message clearfix\" >\n" +
                                "                        <img src=\"/static/login/images/img/icon.png\" class=\"col-sm-2 col-xs-2\" style=\"border-radius: 50%\">\n" +
                                "                        <div class=\"col-sm-10 col-xs-10 clearfix\">\n" +
                                "                            <span style=\"font-weight: bold;\">"+username+"</span>\n" +
                                "                            <div class=\"dropdown location\">\n" +
                                "                                <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n" +
                                "                                    设置 <b class=\"caret\"></b>\n" +
                                "                                </a>\n" +
                                "                                <ul class=\"dropdown-menu\">\n" +
                                "                                    <li><a href=\"javascript:;\" class=\"del\">删除</a></li>\n" +
                                "                                    <li><a href=\"javascript:;\" class=\"set\">编辑</a></li>\n" +
                                "                                </ul>\n" +
                                "                            </div>\n" +
                                "                            <br>\n" +
                                "                            <small class=\"date\" style=\"color:#999\">1分钟前</small>\n" +
                                "                            <div class=\"msg_content\">"+content+"<img class=\"mypic\" src=\"${arg}\" ></div>\n" +
                                "                        </div>\n" +
                                "\n" +
                                "                        <!--评论-->\n" +
                                "                        <div class=\"commentAll col-sm-12 col-xs-12\">\n" +
                                "                            <div class=\"comment-show\">\n" +
                                "                                <div class=\"comment-show-con-list pull-left clearfix\">\n" +
                                "                                    <div class=\"date-dz\">\n" +
                                "                                        <span class=\"date-dz-left pull-left comment-time\">2017-5-2 11:11:39</span>\n" +
                                "                                        <div class=\"date-dz-right pull-right comment-pl-block\">\n" +
                                "                                            <a href=\"javascript:;\" class=\"removeBlock\">删除</a>\n" +
                                "                                            <a href=\"javascript:;\" class=\"date-dz-pl pl-hf hf-con-block pull-left\">回复</a>\n" +
                                "                                            <span class=\"pull-left date-dz-line\">|</span>\n" +
                                "                                            <a href=\"javascript:;\" class=\"date-dz-z pull-left\"><i class=\"date-dz-z-click-red\"></i>赞 (<i class=\"z-num\">666</i>)</a>\n" +
                                "                                        </div>\n" +
                                "                                    </div>\n" +
                                "                                    <div class=\"hf-list-con\"></div>\n" +
                                "                                </div>\n" +
                                "                            </div>\n" +
                                "                            <!--回复区域 end-->\n" +
                                "                        </div>\n" +
                                "                        <!--评论-->\n" +
                                "\n" +
                                "                    </div>");
                        $('.mypic')[0].src = arg
                    }

                },
        })

        $("#content").text('');

    });

    //添加表情包1
    for (var i = 1; i < 60; i++) {

        $(".emoji_1").append("<img src='/static/login/images/img/f"+i+".png' style='width:35px;height:35px' >");
    }
	//添加表情包2
    for (var i = 1; i < 61; i++) {

        $(".emoji_2").append("<img src='/static/login/images/img/h"+i+".png' style='width:35px;height:35px' >");
    }


    $(".emoji").click(function(){

        $(".myEmoji").show();

        //点击空白处隐藏弹出层
        $(document).click(function (e) {

            if (!$("#edit_form").is(e.target) && $("#edit_form").has(e.target).length === 0) {

                $(".myEmoji").hide();
            }
        });
    });

    //将表情添加到输入框
    $(".myEmoji img").each(function(){
        $(this).click(function(){
            var url = $(this)[0].src;

            $('#content').append("<img src='"+url+"' style='width:25px;height:25px' >");
            $(".myEmoji").hide();
            $("#send").removeClass("disabled");

        })
    });

    //放大或缩小预览图片
    $(".item_msg").on('click','.mypic',function(){
        var oWidth=$(this).width(); //取得图片的实际宽度
        var oHeight=$(this).height(); //取得图片的实际高度

        if($(this).height()!=200){
            $(this).height(200);
        }else{
            $(this).height(oHeight + 200/oWidth*oHeight);

        }
    });

    //删除动态说说
     $(".item_msg").on('click','.del',function(){
         var blogid = $(this).parents('.dropdown').parents('.mess').find('.blogid').html()

         $.get("/demo/delblog/", {blog_id:blogid}, function(res, status){

        });
        $(this).parents('.dropdown').parents('.col-sm-10').parents('.message').remove();
    });

     //编辑动态说说
     $(".item_msg").on('click','.set',function(){
         var blogid = $(this).parents('.dropdown').parents('.mess').find('.blogid').html()

         $.get("/demo/delblog/", {blog_id:blogid}, function(res, status){

        });
        $(this).parents('.dropdown').parents('.col-sm-10').parents('.message').remove()
        var blogcontent = $(this).parents('.dropdown').parents('.mess').find('.blogcontent').text()
         $("#content").focus().html(blogcontent)
    });
})

//话题功能
$(function(){
    $.fn.atwho.debug = true
    var emojis = [
      "smile", "iphone", "girl", "smiley", "heart", "kiss", "copyright", "coffee",
      "a", "ab", "airplane", "alien", "ambulance", "angel", "anger", "angry",
      "arrow_forward", "arrow_left", "arrow_lower_left", "arrow_lower_right",
      "arrow_right", "arrow_up", "arrow_upper_left", "arrow_upper_right",
      "art", "astonished", "atm", "b", "baby", "baby_chick", "baby_symbol",
      "balloon", "bamboo", "bank", "barber", "baseball", "basketball", "bath",
      "bear", "beer", "beers", "beginner", "bell", "bento", "bike", "bikini",
      "bird", "birthday", "black_square", "blue_car", "blue_heart", "blush",
      "boar", "boat", "bomb", "book", "boot", "bouquet", "bow", "bowtie",
      "boy", "bread", "briefcase", "broken_heart", "bug", "bulb",
      "person_with_blond_hair", "phone", "pig", "pill", "pisces", "plus1",
      "point_down", "point_left", "point_right", "point_up", "point_up_2",
      "police_car", "poop", "post_office", "postbox", "pray", "princess",
      "punch", "purple_heart", "question", "rabbit", "racehorse", "radio",
      "up", "us", "v", "vhs", "vibration_mode", "virgo", "vs", "walking",
      "warning", "watermelon", "wave", "wc", "wedding", "whale", "wheelchair",
      "white_square", "wind_chime", "wink", "wink2", "wolf", "woman",
      "womans_hat", "womens", "x", "yellow_heart", "zap", "zzz", "+1",
      "-1"
    ]
    var jeremy = decodeURI("J%C3%A9r%C3%A9my") // Jérémy
    var names = ["@sehdy","@cwq","@123","@qqqq","@lurenyi","@lurener","@lurensan","@lurensi","@lurenwu","@lurenliu","Joshua", jeremy, "가"];
    var topic = ["#huati1#","#huati2#","#huati3#","#huati4#","#huati5#","#huati6#","#huati7#","#huati8#", jeremy, "가"];

    var names = $.map(names,function(value,i) {
      return {'id':i,'name':value,'email':value+"@email.com"};
    });
    var topic = $.map(topic,function(value,i) {
      return {'id':i,'name':value};
    });
    var emojis = $.map(emojis, function(value, i) {return {key: value, name:value}});

    var at_config = {
      at: "@",
      data: names,
      headerTpl: '<div class="atwho-header">Member List<small>↑&nbsp;↓&nbsp;</small></div>',
      insertTpl: '${name}',
      displayTpl: "<li>${name} <small>${email}</small></li>",
      limit: 200
    }
    var topic_config = {
      at: "#",
      data: topic,
      headerTpl: '<div class="atwho-header">Topic List<small>↑&nbsp;↓&nbsp;</small></div>',
      insertTpl: '${name}',
      displayTpl: "<li> ${topic} </li>",
      limit: 200
    }
    var emoji_config = {
      at: ":",
      data: emojis,
      displayTpl: "<li>${name} <img src='https://assets-cdn.github.com/images/icons/emoji/${key}.png'  height='20' width='20' /></li>",
      insertTpl: ':${key}:',
      delay: 400
    }
    $inputor = $('#content').atwho(at_config).atwho(emoji_config).atwho(topic_config);
    $inputor.caret('pos', 47);
    $inputor.focus().atwho('run');

    emoji_config.insertTpl = "<img src='https://assets-cdn.github.com/images/icons/emoji/${name}.png'  height='20' width='20' />"
    $('#content').atwho(at_config).atwho(emoji_config).atwho(topic_config);

    ifr = $('#iframe1')[0]
    doc = ifr.contentDocument || iframe.contentWindow.document
    if ((ifrBody = doc.body) == null) {
      // For IE
      doc.write("<body></body>")
      ifrBody = doc.body
    }
    ifrBody.contentEditable = true
    ifrBody.id = 'ifrBody'
    ifrBody.innerHTML = 'For <strong>WYSIWYG</strong> which using <strong>iframe</strong> such as <strong>ckeditor</strong>'
    $(ifrBody).atwho('setIframe', ifr).atwho(at_config)
});

//关注
$(function() {
     $(".recommend").on('click','.fouce',function(){
         var fouce = $(this).text()
         var userid=$('.userid').html()
         if(fouce == "关注")
         {
             $(this).html("已关注")
            var followname = $(this).parents('.followlist').find('.followname').html()
             var follow = Number($('.follow').html())
             follow = follow + 1
             $('.follow').html(follow)
             $.get("/demo/addfollow/", {follow_name:followname, user_id:userid}, function(res, status) {
             })
         }
         else if(fouce == "已关注")
         {
             $(this).html("关注")
             var followid = $(this).parents('.followlist').find('.followid').html()
             var follownum = Number($('.follow').html())
             follownum = follownum - 1
             $('.follow').html(follownum)
              $.get("/demo/delfollow/", {follow:followid}, function(res, status) {
             })
         }
     })
});

//下拉加载
$(function(){
    $('.more').on('click','.morebutt', function(){
        $.get("/demo/getmoreartical/", {}, function(res, status) {
            var articals = JSON.parse(res)
            alert(res)
            for(var i = 0; i < articals.length; i++)
            {
                 $(".item_msg").append("<div class=\"col-sm-12 col-xs-12 message clearfix\" >\n" +
                            "                        <img src=\"/static/login/images/img/icon.png\" class=\"col-sm-2 col-xs-2\" style=\"border-radius: 50%\">\n" +
                            "                        <div class=\"col-sm-10 col-xs-10 clearfix\">\n" +
                            "                            <span style=\"font-weight: bold;\">cwq</span>\n" +
                            "                            <div class=\"dropdown location\">\n" +
                            "                                <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n" +
                            "                                    设置 <b class=\"caret\"></b>\n" +
                            "                                </a>\n" +
                            "                                <ul class=\"dropdown-menu\">\n" +
                            "                                    <li><a href=\"javascript:;\" class=\"del\">删除</a></li>\n" +
                            "                                    <li><a href=\"javascript:;\" class=\"set\">编辑</a></li>\n" +
                            "                                </ul>\n" +
                            "                            </div>\n" +
                            "                            <br>\n" +
                            "                            <small class=\"date\" style=\"color:#999\">1分钟前</small>\n" +
                            "                            <div class=\"msg_content\">"+ articals[i].fields.content +"<p class=\"blogid\" hidden>"+ articals[i].pk +"</p><img class=\"mypic\" src=\"/static/login/images/img/bg_1.jpg\" ><p class=\"blogid\" hidden></p></div>\n" +
                            "                        </div>\n" +
                            "\n" +
                            "                        <!--评论-->\n" +
                            "                        <div class=\"commentAll col-sm-12 col-xs-12\">\n" +
                            "                            <div class=\"comment-show\">\n" +
                            "                                <div class=\"comment-show-con-list pull-left clearfix\">\n" +
                            "                                    <div class=\"date-dz\">\n" +
                            "                                        <span class=\"date-dz-left pull-left comment-time\">2017-5-2 11:11:39</span>\n" +
                            "                                        <div class=\"date-dz-right pull-right comment-pl-block\">\n" +
                            "                                            <a href=\"javascript:;\" class=\"removeBlock\">删除</a>\n" +
                            "                                            <a href=\"javascript:;\" class=\"date-dz-pl pl-hf hf-con-block pull-left\">回复</a>\n" +
                            "                                            <span class=\"pull-left date-dz-line\">|</span>\n" +
                            "                                            <a href=\"javascript:;\" class=\"date-dz-z pull-left\"><i class=\"date-dz-z-click-red\"></i>赞 (<i class=\"z-num\">"+ articals[i].fields.likenum +"</i>)</a>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <div class=\"hf-list-con\"></div>\n" +
                            "                                </div>\n" +
                            "                            </div>\n" +
                            "                            <!--回复区域 end-->\n" +
                            "                        </div>\n" +
                            "                        <!--评论-->\n" +
                            "\n" +
                            "                    </div>");

            }
        })
    })

})