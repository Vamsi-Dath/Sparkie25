from django.urls import path

from .views import get_weather  

urlpatterns = [

    path("api/weather/", get_weather, name="get_weather"),  
    

]
