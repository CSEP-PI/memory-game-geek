from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JogoViewSet, GeraRanking

router = DefaultRouter()
router.register(r'criar-jogo', JogoViewSet, basename='criar-jogo')

urlpatterns = [
    path('', include(router.urls)),
    path('ranking/', GeraRanking.as_view())
] 