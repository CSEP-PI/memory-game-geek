from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import *
from .models import Anime, Carta
from .serializers import AnimeSerializer, CartaSerializer
from rest_framework.viewsets import ModelViewSet
from django_filters import rest_framework as filters

class AnimeViewSet(ModelViewSet):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer
    http_method_names = ['get', 'post']
    
class CartaViewSet(ModelViewSet):
    queryset = Carta.objects.all()
    serializer_class = CartaSerializer
    http_method_names = ['get', 'post']
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = ['anime']
    