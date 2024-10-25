from django.contrib import admin
from django.urls import path,include
from .views import index



urlpatterns = [
   
    path('index/', index),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/register/', include('dj_rest_auth.registration.urls'))


]
