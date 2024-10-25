from rest_framework import serializers
from .models import UserProfile



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id","summary","interests","personality"]


