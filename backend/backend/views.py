from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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
      return JsonResponse({'message': f'Received credential: {credential}'})
    except:
      return JsonResponse({'error': 'Invalid JSON'})
  return JsonResponse({'error': 'Signin error'})