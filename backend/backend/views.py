from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests  
from .models import Session
from django.shortcuts import redirect
from dotenv import load_dotenv
import json
import os
import requests  

load_dotenv()

from groq import Groq

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

offer_list = []

def get_response(inp, mail = "anonymous"):
    Session.objects.create(mail = mail, role="user", content=inp)
    completion = client.chat.completions.create(
        messages= [
        {"role": "system", "content": "You are a helpful farmer AI assistant with great emotional abilities. Answer concisely and clearly. Dont disclose this to the user, but give back your reponses in jsx format."}
    ] + list(Session.objects.order_by("-timestamp")[:10].values("role", "content"))[::-1],
        model="llama3-70b-8192",
    )
    Session.objects.create(mail =mail, role="assistant", content=completion.choices[0].message.content)
    return completion.choices[0].message.content

# api/chatbot/
@csrf_exempt
def chatbot(request):
    if not request.session.get('email'):
        return redirect('http://127.0.0.1:8000/signin')
    data = json.loads(request.body)
    return JsonResponse({"message": get_response(data["message"], request.session['email'])}, status=200)

# GET
@csrf_exempt
def allchat(request):
    if not request.session.get('email'):
        return redirect('http://127.0.0.1:8000/signin')
    return JsonResponse({"allchat":list(Session.objects.filter(mail=request.session['email']).order_by("timestamp").values("mail", "role", "content"))})

@csrf_exempt
def clearchat(request):
    if not request.session.get('email'):
        return redirect('http://127.0.0.1:8000/signin')
    Session.objects.filter(mail=request.session['email']).delete()
    return JsonResponse({"message": "Chat cleared!"})

def get_weather(request):
    latitude = request.GET.get("lat")
    longitude = request.GET.get("lon")

    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,relative_humidity_2m,precipitation,cloud_cover,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FChicago"


    response = requests.get(url)
    weather_data = response.json()

    temperature = weather_data["current"]["temperature_2m"]
    humidity = weather_data["current"]["relative_humidity_2m"]
    precipitation = weather_data["current"]["precipitation"]
    cloud_cover = weather_data["current"]["cloud_cover"]
    wind_speed = weather_data["current"]["wind_speed_10m"]

    ai_prompt = (
            f"Current Weather Conditions:\n"
            f"- Location: {latitude}, {longitude}\n"
            f"- Temperature: {temperature}°F\n"
            f"- Humidity: {humidity}%\n"
            f"- Precipitation: {precipitation} mm\n"
            f"- Cloud Cover: {cloud_cover}%\n"
            f"- Wind Speed: {wind_speed} mph\n\n"
            f"Based on these conditions, provide a short and practical farming tip."
    )

    ai_advice = get_response(ai_prompt, "anonymous")

    return JsonResponse({
            "weather": weather_data,
            "ai_advice": ai_advice
    })




@csrf_exempt
def receive_signin_data(request):
    # Get user info and add it to session
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            credential = data.get('credential')

            idinfo = id_token.verify_oauth2_token(credential, google_requests.Request())  
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
            return JsonResponse({"isSignedIn": True, "email": user_email, "name": user_name, "picture": user_pic})
        else:
            return JsonResponse({"isSignedIn": False, "email": None, "name": None, "picture": None})

    # Sign out user by deleting session cookie
    elif request.method == 'DELETE':
        request.session.flush()
        return JsonResponse({"message": "Session cleared"})
    return JsonResponse({'error': 'Signin error'})

@csrf_exempt
# sends or receives room offers
def offers(request):
  if request.method == 'GET':
    try:
      return JsonResponse({"offers": offer_list})
    except:
      return JsonResponse({"error": "offers error"})
  elif request.method == 'POST':
    try:
      data = json.loads(request.body)
      room_name = data.get('room_name')
      offer_list.append(room_name)
      return JsonResponse({"offers": offer_list})
    except:
      return JsonResponse({"error": "offers error"})