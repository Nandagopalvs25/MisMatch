from django.db import models
from django.contrib.auth.models import User
# Create your models here.




class UserProfile(models.Model):
     user = models.ForeignKey(User, on_delete=models.CASCADE)
     summary = models.TextField(max_length=1000, null=True, blank=True)
     interests=  models.TextField(max_length=1000, null=True, blank=True)
     personality=models.TextField(max_length=1000, null=True, blank=True)
     ai_summary=models.TextField(max_length=1000, null=True, blank=True)
     profile_url = models.CharField(null=True,blank=True,max_length=300)
     
     def __str__(self):
        return self.user.username
