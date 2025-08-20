from rest_framework.serializers import ModelSerializer
from .models import Anime, Carta

class AnimeSerializer(ModelSerializer):
    class Meta:
        model = Anime
        fields = '__all__'
        
class CartaSerializer(ModelSerializer):
    class Meta:
        model = Carta
        fields = '__all__'
        