from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google.oauth2 import id_token
from google.auth.transport import requests
from .models import Session
from dotenv import load_dotenv
import json
load_dotenv()

from groq import Groq

client = Groq(
    # api_key=os.getenv("GROQ_API_KEY"),
    api_key="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"
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

def get_weather(request):
    latitude = request.GET.get("lat")
    longitude = request.GET.get("lon")



    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m,precipitation&temperature_unit=fahrenheit&wind_speed_unit=mph"

    response = requests.get(url)
    data = response.json()
    return JsonResponse(data)

@csrf_exempt
def receive_signin_data(request):
  # Get user info and add it to session
  if request.method == 'POST':
    try:
      data = json.loads(request.body)
      credential = data.get('credential')

      idinfo = id_token.verify_oauth2_token(credential, requests.Request())
      user_email = idinfo['email']
      user_name = idinfo['name']
      user_pic = idinfo['picture']
      request.session['email'] = user_email
      request.session['name'] = user_name
      request.session['picture'] = user_pic

      return JsonResponse({"email": user_email, "name": user_name, "picture": user_pic})
    except:
      return JsonResponse({'error': 'Data error'})

  # Get user info from session cookie
  elif request.method == 'GET':
    if request.session.get('name'):
      user_email = request.session.get('email')
      user_name = request.session.get('name')
      user_pic = request.session.get('picture')
      return JsonResponse({"email": user_email, "name": user_name, "picture": user_pic})
  
  # Sign out user by deleting session cookie
  elif request.method == 'DELETE':
    request.session.flush()
    return JsonResponse({"message": "Session cleared"})
  return JsonResponse({'error': 'Signin error'})
