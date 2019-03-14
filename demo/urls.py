# coding=utf-8

from django.conf.urls import url
from .import views
from django.urls import path

urlpatterns = [
    url(r'^login/$', views.login),
    url(r'^microblog/$', views.microblog),
    url(r'hotblog/$', views.hotblog),
    url(r'topic/$', views.topic),
    url(r'getcomment/$', views.get_blog_all_comments),
    url(r'delcomment/$', views.del_blog_comments),
    url(r'addcomment/$', views.add_blog_comments),
    url(r'addblog/$', views.add_blog),
    url(r'delblog/$', views.del_blog),
    url(r'addfollow/$', views.add_follow),
    url(r'delfollow/$', views.del_follow),
    url(r'getmoreartical/$', views.get_more_artical),
    url(r'register/$', views.register),
    path('searchblog/', views.searchblog),
    path('forget/', views.forget),
    path('personal/', views.personal),
    path('personal1/', views.personal1),
]