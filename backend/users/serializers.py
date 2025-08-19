from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['username', 'telefone']
        
    def create(self, validated_data):
        user = User(**validated_data)
        user.save()
        
        return user