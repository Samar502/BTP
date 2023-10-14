from rest_framework import serializers
from .models import Doctor

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'firstName', 'lastName', 'identity', 'education', 'employment', 'location', 'email', 'password']


def create(self, validate_data):
    return Doctor.objects.create(**validate_data)