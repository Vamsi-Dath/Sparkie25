from django.urls import path
from . import consumers

websocket_urlpatterns = [
  path('ws/webrtc/<str:room_name>/', consumers.WebRTCConsumer.as_asgi()),
]