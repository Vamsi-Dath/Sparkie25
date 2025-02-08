from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def chatbot_example(request):
  data = {'data': [
    {'one':'item1'},
    {'two':'item2'},
    {'three':'item3'}
  ],
  'message': 'hello'}
  return JsonResponse(data)