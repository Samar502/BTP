from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'readStatus', 'time']


def create(self, validate_data):
    return Message.objects.create(**validate_data)