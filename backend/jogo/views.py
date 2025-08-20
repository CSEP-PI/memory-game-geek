from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import *
from .models import Jogo, Questao, Resposta
from .serializers import JogoSerializer, QuestaoSerializer, RespostaSerializer
from rest_framework.viewsets import ModelViewSet
import random

class JogoViewSet(ModelViewSet):
    queryset = Jogo.objects.all()
    serializer_class = JogoSerializer
    http_method_names = ['post']
    
class EnviarPergunta(APIView):
    def get(self, request):
        anime = request.query_params.get('anime')
        
        if not anime:
            return Response({
                "detail": "Você deve informar um anime."
            }, status=HTTP_400_BAD_REQUEST)
        
        questoes = Questao.objects.filter(anime=anime)
        questao_aleatoria = random.choice(questoes)
        respostas = Resposta.objects.filter(questao=questao_aleatoria.id)
        
        return Response({
                "detail": "Questão enviada com sucesso!",
                "questao": QuestaoSerializer(questao_aleatoria).data,
                "respostas": RespostaSerializer(respostas, many=True).data
            }, status=HTTP_200_OK)
        
    
class GeraRanking(APIView):
    def get(self, request):
        anime = request.query_params.get('anime')
        ...
        dificil = 2
        medio = 1.5
        facil = 1
        
        tref_f = 180 #min 1,8
        tref_m = 240 #min 2,4
        tref_d = 300 #min 3,0
        
        resultado = []
        
        jogos = Jogo.objects.all()
        for jogo in jogos:
            dificuldade = jogo.dificuldade
            quiz_pontos = 0
            efc_pontos = 0
            tempo_pontos = 0
            total = 0
            if dificuldade == 'F':
                quiz_pontos = (jogo.qtd_quiz / 6)
                efc_pontos = (6 / jogo.qtd_jogadas)
                tempo_pontos = (tref_f / jogo.tempo)
                if tempo_pontos > 1.8:
                    tempo_pontos = 1.8
                    
                total = facil * 1000 * ((0.40 * quiz_pontos) + (0.35 * efc_pontos) + (0.25 * tempo_pontos))
            
            if dificuldade == 'M':
                quiz_pontos = (jogo.qtd_quiz / 8)
                efc_pontos = (8 / jogo.qtd_jogadas)
                tempo_pontos = (jogo.tempo / tref_m)
                if tempo_pontos > 2.4:
                    tempo_pontos = 2.4
                    
                total = medio * 1000 * ((0.40 * quiz_pontos) + (0.35 * efc_pontos) + (0.25 * tempo_pontos))
                
            
            if dificuldade == 'D':
                quiz_pontos = (jogo.qtd_quiz / 10)
                efc_pontos = (10 / jogo.qtd_jogadas)
                tempo_pontos = (jogo.tempo / tref_d)
                if tempo_pontos > 3:
                    tempo_pontos = 3
                    
                total = dificil * 1000 * ((0.40 * quiz_pontos) + (0.35 * efc_pontos) + (0.25 * tempo_pontos))
                
            rk = {
                    "user": jogo.usuario.username,
                    "anime": jogo.anime.nome,
                    "dificuldade": jogo.dificuldade,
                    "qtd_quiz": jogo.qtd_quiz,
                    "qtd_jogadas": jogo.qtd_jogadas,
                    "tempo": jogo.tempo,
                    "quiz_pontos": round(quiz_pontos, 1),
                    "efc_pontos": round(efc_pontos, 1),
                    "tempo_pontos": round(tempo_pontos, 1),                    
                    "total_pontos": round(total)
                }
            resultado.append(rk)
            
        resultado.sort(key=lambda x: x['total_pontos'], reverse=True)
        
        return Response({
            "detail": "Ranking gerado com sucesso!",
            "ranking": resultado
        }, status=HTTP_200_OK)
                
                