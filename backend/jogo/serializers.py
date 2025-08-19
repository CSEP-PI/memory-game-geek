from .models import Jogo, Questao, Resposta
from rest_framework.serializers import ModelSerializer

class JogoSerializer(ModelSerializer):
    class Meta:
        model = Jogo
        fields = '__all__'
        
class QuestaoSerializer(ModelSerializer):
    class Meta:
        model = Questao
        fields = '__all__'
        
class RespostaSerializer(ModelSerializer):
    class Meta:
        model = Jogo
        fields = '__all__'        