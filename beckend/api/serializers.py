from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User  # Correctly reference the model here
        fields = ['id', 'username', 'email',"password"]  # List fields you want to include in the serializer
