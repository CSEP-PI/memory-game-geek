from django.contrib import admin
from django.urls import path, include
from .views import CadastroView, LoginView

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('cadastro/', CadastroView.as_view()),
] 