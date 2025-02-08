from django.shortcuts import render
import requests
from django.http import JsonResponse

def get_weather(request):
    latitude = request.GET.get("lat")
    longitude = request.GET.get("lon")



    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m,precipitation&temperature_unit=fahrenheit&wind_speed_unit=mph"

    response = requests.get(url)
    data = response.json()
    return JsonResponse(data)

