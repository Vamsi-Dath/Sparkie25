import json
from channels.generic.websocket import AsyncWebsocketConsumer

class WebRTCConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    self.room_name = self.scope['url_route']['kwargs']['room_name']
    self.room_group_name = f"webrtc_{self.room_name}"

    # join room
    await self.channel_layer.group_add(
      self.room_group_name,
      self.channel_name
    )

    await self.accept()

  async def disconnect(self, close_code):
    # leave room
    await self.channel_layer.group_discard(
      self.room_group_name,
      self.channel_name
    )

  async def receive(self, text_data):
    message = json.loads(text_data)

    await self.channel_layer.group_send(
      self.room_group_name,
      {
        'type': 'send_message',
        'message': message
      }
    )

  async def send_message(self, data):
    message = data['message']

    # send message to websocket
    await self.send(text_data=json.dumps(message))
