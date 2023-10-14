from rest_framework import serializers
from .models import Blogs

class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = ['id', 'title', 'author', 'content', 'imgAddress']


def create(self, validate_data):
    return Blogs.objects.create(**validate_data)