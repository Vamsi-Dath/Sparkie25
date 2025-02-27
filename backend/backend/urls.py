"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from . import views

urlpatterns = [

    path("api/weather/", views.get_weather, name="get_weather"),  
    

    path('admin/', admin.site.urls),
    re_path(r'^(?!ws\/|api\/|auth\/).*', TemplateView.as_view(template_name='index.html')),
    path('auth/', include('allauth.urls')),
    path('api/chatbot', views.chatbot),
    path('api/allchat', views.allchat),
    path('api/clearchat', views.clearchat),
    path('api/signin', views.receive_signin_data),
    path('api/offers', views.offers)
]
