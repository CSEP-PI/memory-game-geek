from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JogoViewSet, GeraRanking, EnviarPergunta

router = DefaultRouter()
router.register(r'criar-jogo', JogoViewSet, basename='criar-jogo')

urlpatterns = [
    path('', include(router.urls)),
    path('ranking/', GeraRanking.as_view()),
    path('pergunta/', EnviarPergunta.as_view()),
] 