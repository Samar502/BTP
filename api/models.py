from django.db import models

# Create your models here.

class Patient(models.Model):
    firstName=models.CharField(max_length=100)
    lastName=models.CharField(max_length=100)
    identity=models.CharField(max_length=100, default='')
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100)

class Doctor(models.Model):
    firstName=models.CharField(max_length=100)
    lastName=models.CharField(max_length=100)
    identity=models.CharField(max_length=100, default='')
    education=models.CharField(max_length=100)
    employment=models.CharField(max_length=100)
    location=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100)

class Message(models.Model):
    sender=models.CharField(max_length=100)
    receiver=models.CharField(max_length=100)
    content=models.CharField(max_length=100)
    readStatus=models.CharField(max_length=100)
    time=models.DateTimeField(auto_now_add=True)

class Files(models.Model):
    sender = models.CharField(max_length=100)
    receiver = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='media')
    time=models.DateTimeField(auto_now_add=True)

class Blogs(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    content = models.CharField(max_length=1000)
    imgAddress = models.CharField(max_length=1000)