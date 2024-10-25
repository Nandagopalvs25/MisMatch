from django.contrib import admin
from django.urls import path,include
from .views import index,Summary,CreateProfile,UpdateProfile,FindMatch,AiChatWindow



urlpatterns = [
   
    path('index/', index),
    path('auth/', include('dj_rest_auth.urls')),
    path('summary/',Summary.as_view()),
    path('createProfile/',CreateProfile.as_view()),
    path('findMatch/',FindMatch.as_view()),
    path('aichat/',AiChatWindow.as_view()),
   
    path('updateProfile/<int:pk>/',UpdateProfile.as_view( {'patch': 'partial_update'})),
    path('auth/register/', include('dj_rest_auth.registration.urls'))


]
