from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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
      return JsonResponse({'message': f'Received credential: {credential}'})
    except:
      return JsonResponse({'error': 'Invalid JSON'})
  return JsonResponse({'error': 'Signin error'})

def get_weather(request):
    latitude = request.GET.get("lat")
    longitude = request.GET.get("lon")



    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m,precipitation&temperature_unit=fahrenheit&wind_speed_unit=mph"

    response = requests.get(url)
    data = response.json()
    return JsonResponse(data)