from django.contrib import admin
from .models import Patient, Doctor, Message, Files, Blogs

# Register your models here.
@admin.register(Patient)
class  PatientAdmin(admin.ModelAdmin):
    list_dsplay=['id', 'firstName', 'lastName', 'identity', 'email', 'password']

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display=['id', 'firstName', 'lastName', 'identity', 'education', 'employment', 'location', 'email', 'password']

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display=['id', 'sender', 'receiver', 'content', 'readStatus', 'time']

@admin.register(Files)
class FilesAdmin(admin.ModelAdmin):
    list_display=['id', 'sender', 'receiver', 'file']

@admin.register(Blogs)
class BlogsAdmin(admin.ModelAdmin):
    list_display=['id', 'title', 'author', 'content', 'imgAddress']