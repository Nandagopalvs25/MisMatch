from django.db import models
from django.contrib.auth.models import User
# Create your models here.




class UserProfile(models.Model):
     user = models.ForeignKey(User, on_delete=models.CASCADE)
     gender=models.CharField(max_length=15,null=True,blank=True)
     age=models.IntegerField(null=True,blank=True)
     preferences=models.TextField(max_length=1000, null=True, blank=True)
     summary = models.TextField(max_length=1000, null=True, blank=True)
     interests=  models.TextField(max_length=1000, null=True, blank=True)
     personality=models.TextField(max_length=1000, null=True, blank=True)
     ai_summary=models.TextField(max_length=1000, null=True, blank=True)
     profile_url = models.CharField(null=True,blank=True,max_length=300)
     
     def __str__(self):
        return self.user.username


class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_message = models.TextField()
    bot_response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.user_message}"