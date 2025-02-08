from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google.oauth2 import id_token
from google.auth.transport import requests
import json
from .models import Session
from dotenv import load_dotenv
import os
import json
load_dotenv()

from groq import Groq

client = Groq(
    api_key=os.getenv("GROQ_API_KEY"),
)

def get_response(inp):
    Session.objects.create(role="user", content=inp)
    completion = client.chat.completions.create(
        messages= list(Session.objects.order_by("timestamp")[:10].values("role", "content"))[::-1],
        model="llama3-70b-8192",
    )
    Session.objects.create(role="assistant", content=completion.choices[0].message.content)
    return completion.choices[0].message.content

# api/chatbot/
def chatbot(request):
    data = json.loads(request.body)
    return JsonResponse({"message": get_response(data["message"])}, status=200)

# GET
def allchat(request):
    return JsonResponse({"allchat":list(Session.objects.order_by("timestamp").values("role", "content"))})

def clearchat(request):
    Session.objects.all().delete()
    return JsonResponse({"message": "Chat cleared!"})

# POST //chatbot
# {
#     "message" : "Hello"
# }


# GET //allchat
# {
#     {
#         "role": "user",
#         "content": "Hello"
#     },
#     {
#         "role": "assistant",
#         "content": "Hi How are
#     }
# }
# content = "Hi How are you?" //assistant

@csrf_exempt
def receive_signin_data(request):
  if request.method == 'POST':
    try:
      data = json.loads(request.body)
      credential = data.get('credential')

      idinfo = id_token.verify_oauth2_token(credential, requests.Request())

      user_email = idinfo['email']
      user_name = idinfo['name']
      user_pic = idinfo['picture']
      return JsonResponse({"email": user_email, "name": user_name, "picture": user_pic})
    except:
      return JsonResponse({'error': 'Data error'})
  return JsonResponse({'error': 'Signin error'})