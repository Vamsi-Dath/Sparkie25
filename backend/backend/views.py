from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google.oauth2 import id_token
from google.auth.transport import requests
import json

# Create your views here.
def chatbot_example(request):
  data = {'data': [
    {'one':'item1'},
    {'two':'item2'},
    {'three':'item3'}
  ],
  'message': 'hello'}
  return JsonResponse(data)

@csrf_exempt
def receive_signin_data(request):
  if request.method == 'POST':
    try:
      data = json.loads(request.body)
      credential = data.get('credential')

      idinfo = id_token.verify_oauth2_token(credential, requests.Request())

      user_email = idinfo['email']
      user_name = idinfo['name']
      user_pic = idinfo['picture']
      return JsonResponse({"email": user_email, "name": user_name, "picture": user_pic})
    except:
      return JsonResponse({'error': 'Data error'})
  return JsonResponse({'error': 'Signin error'})