from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnimeViewSet, CartaViewSet

router = DefaultRouter()
router.register(r'animes', AnimeViewSet, basename='animes')
router.register(r'cartas', CartaViewSet, basename='cartas')

urlpatterns = [
    path('', include(router.urls)),
] 