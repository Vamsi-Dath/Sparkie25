import requests
from django.http import JsonResponse

def get_weather(request):
    latitude = request.GET.get("lat")
    longitude = request.GET.get("lon")

    if not latitude or not longitude:
        return JsonResponse({"error": "Latitude and longitude are required"}, status=400)

    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m,precipitation&temperature_unit=fahrenheit&wind_speed_unit=mph"

    try:
        response = requests.get(url)
        data = response.json()
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({"error": "Failed to fetch weather data", "details": str(e)}, status=500)
