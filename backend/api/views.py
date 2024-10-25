from django.shortcuts import render
from django.http import HttpResponse
import os
import google.generativeai as genai
import json
from django.conf import settings

# Create your views here.


def index(request):
    return HttpResponse("Hello WOrld")

