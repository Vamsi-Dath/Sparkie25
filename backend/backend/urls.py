from django.urls import path
from .views import get_weather  # Import the function from views.py

urlpatterns = [
    path("api/weather/", get_weather, name="get_weather"),  # Weather API
]
