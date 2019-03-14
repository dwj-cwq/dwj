from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib import auth
from demo.models import Artical, Follow, Comment, At, Topic, Userimage
from django.core.mail import send_mail

def login(request):
    if request.method == "GET":
        return render(request, 'demo/login.html')
    elif request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username, password)
        user = auth.authenticate(username=username, password=password)
        message = ''
        if user:
            request.session['user'] = user.id
            auth.login(request, user)
            artical = Artical.objects.filter(user_id=user.id).order_by('-id')
            userlist = {user.username: artical}
            follow = Follow.objects.filter(user_id=user.id)
            funs = Follow.objects.filter(wasFollowed=user.username)
            stranger = User.objects.exclude(id=user.id)
            ater = At.objects.filter(wasAt=user.id)
            wasAt = User.objects.filter(id=10000)
            topic = Topic.objects.all()
            for a in ater:
                one = User.objects.filter(id=a.artical_id)
                temp = one | wasAt
                wasAt = temp
            for i in follow:
                users = User.objects.get(username=i.wasFollowed)
                art = Artical.objects.filter(user_id=users.id).order_by('-id')
                userlist[users.username] = art
                stranger1 = stranger.exclude(id=users.id)
                stranger = stranger1
            return render(request, 'demo/microblog.html', {'user': user, 'userlist': userlist, 'followNum': follow.count(), 'funsNum': funs.count(), 'articalNum': artical.count(), 'stranger': stranger, 'wasAt': wasAt, 'topic': topic})
        else:
            message = "用户名或密码不正确"
            return render(request, 'demo/login.html', {"message": message})


def register(request):
    if request.method == "GET":
        return render(request, 'demo/register.html', )
    if request.method == "POST":
        email = request.POST.get('email', None)
        username = request.POST.get('username', None)
        password = request.POST.get('password1', None)
        message = ''
        if username and password:
            try:
                user = User.objects.get(username=username)
            except:
                User.objects.create_user(email=email, username=username, password=password)
                return render(request, 'demo/login.html')
            message = "该用户名已被使用"
        return render(request, 'demo/register.html', {"message": message})


def forget(request):
    if request.method == "GET":
        return render(request, 'demo/forget.html', )
    if request.method == "POST":
        email = request.POST.get('email', None)
        username = request.POST.get('username', None)
        newpassword = request.POST.get('password1', None)
        confirmpassword = request.POST.get('password2', None)
        message=""
        if email and username and newpassword and confirmpassword:
            try:
                print(newpassword)
                user = User.objects.get(email=email, username=username)
                print(user)
            except:
                message = "未找到此用户"
                return render(request, 'demo/forget.html', {"message": message})
            if newpassword != confirmpassword:
                message = "密码不一致"
                return render(request, 'demo/forget.html', {"message": message})
            else:
                user.set_password(newpassword)
                user.save()
                print(user.username, user.password)
                message = "修改成功"
                return render(request, 'demo/login.html',)
        else :
            user = User.objects.get(email=email, username=username)
            password = user.password
            p = str(user.password)
            send_mail('找回密码', '你的密码是：' + p, email, ['648752437@qq.com'], fail_silently=False)
            return JsonResponse("成功", safe=False)


def hotblog(request):
    if request.method == 'GET':
        artical = Artical.objects.all().order_by('-likenum')
        userlist = {}
        for art in artical:
            users = User.objects.get(id=art.user_id)
            userlist[art] = users.username
            print(userlist)
        return render(request, 'demo/hotblog.html',{'userlist':userlist})

def topic(request):
    if request.method == 'GET':
        topicID = request.GET['topicID']
        topic = Topic.objects.get(id=topicID)
        user = User.objects.get(id=topic.user_id)
        artical = topic.artical.all()
        topic1 = Topic.objects.all()
        print(artical)
        userlist = {}
        for art in artical:
            users = User.objects.get(id=art.user_id)
            userlist[art] = users.username
        return render(request, 'demo/topic.html',
                      {'user': user, 'artical': artical, 'topic': topic1, 'userlist': userlist})

def searchblog(request):
    if request.method == 'GET':
        hto = request.GET.get('hottopic')
        print(hto)
        try:
            artical = Artical.objects.get(title=hto)
            user = User.objects.get(id=artical.id)
        except:
            print("a")
            message = "您搜索的文章不存在！"
            return render(request, 'demo/searchblog.html', {'message': message})
        return render(request, 'demo/searchblog.html', {'artical': artical, 'user': user})

def personal(request):
    if request.method == 'GET':
        user_id = request.session.get('user')
        user = User.objects.get(id=user_id)
        artical = Artical.objects.filter(user_id=user.id)
        follow = Follow.objects.filter(user_id=user.id)
        funs = Follow.objects.filter(wasFollowed=user.username)
        followPeople = User.objects.filter(id=10000)
        for i in follow:
            one = User.objects.filter(username=i.wasFollowed)
            print(i.wasFollowed)
            temp1 = followPeople | one
            followPeople = temp1
        print(followPeople)
        return render(request, 'demo/personal.html',
                      {'user': user, 'artical': artical, 'followNum': follow.count(), 'funsNum': funs.count(),
                       'articalNum': artical.count(), 'followPeople': followPeople})


def microblog(request):
    if request.method == 'GET':
        return render(request, 'demo/microblog.html')

def add_blog(request):
    if request.is_ajax():
        print(request.body)
        print(request.POST)
        blogtime = request.POST.get('blog_time')
        blogcontent = request.POST.get('blog_content')
        userid = request.POST.get('user_id')
        blogtitle = request.POST.get('blog_title')
        userID = int(userid)
        if request.FILES:
            blogimage = request.FILES['blog_img']
            art = Artical(title=blogtitle, content=blogcontent, user_id=userID, ctime=blogtime, photo=blogimage)
            art.save()
            url = art.photo.url
            print(art.photo.url)
            return JsonResponse(url, safe=False)
        else:
            art = Artical(title=blogtitle, content=blogcontent, user_id=userID, ctime=blogtime)
            art.save()
            return JsonResponse("noimg", safe=False)


def del_blog(request):
    if request.method == 'GET':
        strId = request.GET['blog_id']
        articalId = int(strId)
        Artical.objects.get(id=articalId).delete()
        return JsonResponse("删除成功", safe=False)

def get_blog_all_comments(request):
    if request.method == "GET":
        strId = request.GET['blog_id']
        blogid = int(strId)
        list_contents = serializers.serialize("json", Comment.objects.filter(artical_id=blogid))
        return JsonResponse(list_contents, safe=False)

def del_blog_comments(request):
    if request.method == "GET":
        strId = request.GET['comment_id']
        commentid = int(strId)
        Comment.objects.get(id=commentid).delete()
        return JsonResponse("删除成功", safe=False)

def add_blog_comments(request):
    if request.method == "GET":
        strId = request.GET['comment_time']
        commentcontent = request.GET['comment_content']
        userid = request.GET['user_id']
        blogid = request.GET['blog_id']
        commentid = int(blogid)
        userID = int(userid)
        comm = Comment(content=commentcontent, artical_id=commentid, user_id=userID)
        comm.save()
        return JsonResponse("评论成功", safe=False)

def add_headImage(request):
    if request.method == 'POST':
        name = request.POST.get('username')
        avatar = request.FILES.get('avatar')
        Userimage.objects.create(user_id=User.objects.get(username=name).id, headimage=avatar)
        return HttpResponse('ok')
    return render(request, 'demo/personal.html')


def add_follow(request):
    if request.method == 'GET':
        userid = request.GET['user_id']
        followname = request.GET['follow_name']
        Follow.objects.create(user_id=userid, wasFollowed=followname)
        return JsonResponse("成功", safe=False)

def del_follow(request):
    if request.method == 'GET':
        followid = request.GET['follow']
        fid = int(followid)
        Follow.objects.get(id =fid).delete()
        return JsonResponse("成功", safe=False)

def get_more_artical(request):
    if request.method == 'GET':
        login_userid = request.session.get('user')
        stranger = User.objects.exclude(id=login_userid)
        # art1 = Artical.objects.filter(user_id=stranger[0].id)
        # artlist = {stranger[0].username:art1}
        # for i in stranger:
        #     art = Artical.objects.filter(user_id=i.id)
        #     artlist[i.username]=art
        list_articals = serializers.serialize("json",Artical.objects.all())
        return JsonResponse(list_articals, safe=False)

def personal1(request):
    if request.method == 'GET':
        id = request.GET['userID']
        user = User.objects.get(id=id)
        artical = Artical.objects.filter(user_id=user.id)
        follow = Follow.objects.filter(user_id=user.id)
        funs = Follow.objects.filter(wasFollowed=user.username)
        followPeople = User.objects.filter(id=10000)
        for i in follow:
            one = User.objects.filter(username=i.wasFollowed)
            print(i.wasFollowed)
            temp1 = followPeople | one
            followPeople = temp1
        print(followPeople)
        return render(request, 'demo/personal.html',
                      {'user': user, 'artical': artical, 'followNum': follow.count(), 'funsNum': funs.count(),
                       'articalNum': artical.count(), 'followPeople': followPeople})