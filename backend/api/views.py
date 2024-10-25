from django.http import HttpResponse,JsonResponse
import os
import json
from django.conf import settings
import google.generativeai as genai
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework.views import APIView
from django.views.generic.edit import CreateView,UpdateView
from .serializers import ProfileSerializer
from rest_framework import response,status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

# Create your views here.


def index(request):
    id = request["id"]
    usr = User.objects.get(id=id)
    print(usr)
    return HttpResponse("Hello WOrld")


class Summary(APIView):
    def post(self,request):
        id = request.data["id"]
        usr = User.objects.get(id=id)
        usrProfile=UserProfile.objects.get(user=usr)
        genai.configure(api_key=settings.GEMINI_KEY)
        generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain",
           }
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=generation_config,
        )
        response=model.generate_content("Provide a brief summary about the person based on his interests and profile summary. Interests are: "+usrProfile.interests+"About the person:"+usrProfile.summary)
        print(response.text)
        return HttpResponse(response.text)
    
    
class CreateProfile(APIView):
    def post(self,request):
          user = User.objects.get(id=request.user.id)
          if(UserProfile.objects.filter(user=user).exists()):
              return HttpResponse("Profile Already Exists") 
          else:
              interest = request.data.get("interests","")
              summary= request.data.get("summary","")
              personality= request.data.get("personailty","")
              profile=UserProfile.objects.create(user=user,summary=summary,interests=interest,personality=personality)
              return Response(status=status.HTTP_201_CREATED)
              
    def get(self,request):
         user = User.objects.get(id=request.user.id)
         if(UserProfile.objects.filter(user=user).exists()):
              profile= UserProfile.objects.get(user=user)
              profile_data=ProfileSerializer(profile).data
              return JsonResponse(profile_data,safe=False)

          
          
class UpdateProfile(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = ProfileSerializer


        
class FindMatch(APIView):
   def get(self,request):
      user = User.objects.get(id=request.user.id)
      profile=UserProfile.objects.get(user=user.id)
      userprofile={
          'username':profile.user.username,
          'personality':profile.personality,
          'interests':profile.interests,
          'summary':profile.summary
      }
      candidates_data = []
      profiles = UserProfile.objects.exclude(id=profile.id)
      for profile in profiles:
          user_info = {
            'username':profile.user.username,
            'id':profile.user.id,
            'personality': profile.personality,
            'interests': profile.interests,
            'summary': profile.summary
           }
          candidates_data.append(user_info)
      print(userprofile)
      
      genai.configure(api_key=settings.GEMINI_KEY)
      generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192,
            "response_mime_type": "application/json",
           }
      model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction="Analyze the user profile labelled as userprofile, you will be given a list of other peoples profiles labelled as candidates_data, from that list pick a person who has the most opposite personality of the userprofile candidate. Output Just their name and id",
            generation_config=generation_config,
        )
      userprofile=json.dumps(userprofile)
      candidates_data=json.dumps(candidates_data)
      response=model.generate_content("userprofile is"+userprofile+"candidates_data is"+candidates_data)
      return HttpResponse(response.text)
      
class AiChatWindow(APIView):
    def post(self,request):
              user = User.objects.get(id=request.user.id)
              matched_id=request.data["id"]
              prompt=request.data["prompt"]

              matched_user=UserProfile.objects.get(user=User.objects.get(id=matched_id))
              print(matched_user.user.username)
              userprofile={
                  "username":matched_user.user.username,
                  "user_summary":matched_user.summary,
                  "user_interests":matched_user.interests,
                  "user_personality":matched_user.personality
              }
              userprofile=json.dumps(userprofile)
              genai.configure(api_key=settings.GEMINI_KEY)
              generation_config = {
                "temperature": 1,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "application/json",
              }
              model = genai.GenerativeModel(
              model_name="gemini-1.5-flash",
              system_instruction="Model yourself as a person by analysing the information labelled as userprofile. Respond to prompt messages keeping the personailty mentioned in userprofile. Dont talk too much , keep sentences short to less than 60 characters",
              generation_config=generation_config,
              )
              response=model.generate_content("userprofile:"+userprofile+"prompt:"+prompt)

              return HttpResponse(response.text)


        

    

