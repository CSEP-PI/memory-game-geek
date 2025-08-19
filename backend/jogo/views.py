from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import *
from .models import Jogo
from .serializers import JogoSerializer
from rest_framework.viewsets import ModelViewSet

class JogoViewSet(ModelViewSet):
    queryset = Jogo.objects.all()
    serializer_class = JogoSerializer
    http_method_names = ['post']
    
class GeraRanking(APIView):
    def get(self, request):
        anime = request.query_params.get('anime')
        ...
        dificil = 2
        medio = 1.5
        facil = 1
        
        bonus_max = 1.90
        bonus_med = 1.60
        bonus_min = 1.30
        
        jogos = Jogo.objects.all()
        for jogo in jogos:
            dificuldade = jogo.dificuldade
            if dificuldade == 'F':
                quiz_pontos = (jogo.qtd_quiz * 50)
                tempo_pontos = 0
                
                