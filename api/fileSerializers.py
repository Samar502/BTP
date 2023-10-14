from rest_framework import serializers
from .models import Files

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ['id', 'sender', 'receiver', 'title', 'file', 'time']


def create(self, validate_data):
    return Files.objects.create(**validate_data)