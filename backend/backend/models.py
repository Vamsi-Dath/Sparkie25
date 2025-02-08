from django.db import models

class Session(models.Model):
    role = models.CharField(max_length=10)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)