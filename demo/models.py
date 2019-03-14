
from django.db import models
from django.contrib.auth.models import User

class Userimage (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default="")
    headimage = models.ImageField(null=True, blank=True, upload_to='headImage')

class Artical(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    title = models.CharField(max_length=16, default="")
    photo = models.ImageField(null=True, blank=True, upload_to='articalImage')
    content = models.TextField()
    likenum = models.PositiveIntegerField(default=0)
    ctime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    artical = models.ForeignKey(Artical, on_delete=models.CASCADE, default="")
    content = models.TextField()

    def __str__(self):
        return self.content


class Reply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    content = models.TextField()

    def __str__(self):
        return self.content


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    artical = models.ForeignKey(Artical, on_delete=models.CASCADE, default="")

    def __str__(self):
        return self.artical


class Topic(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    artical = models.ManyToManyField(Artical,  default="")
    content = models.CharField(max_length=32, default="")

    def __str__(self):
        return self.content


class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    wasFollowed = models.CharField(max_length=32, default="")

    def __str__(self):
        return self.user.username


class At(models.Model):
    artical = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    wasAt = models.CharField(max_length=32, default="")

    def __str__(self):
        return self.wasAt