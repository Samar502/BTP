from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'firstName', 'lastName', 'identity', 'email', 'password']


def create(self, validate_data):
    return Patient.objects.create(**validate_data)