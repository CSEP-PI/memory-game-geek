from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import *
from .serializers import UserSerializer
from .models import User

# Create your views here.


class CadastroView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response({
                "detail": 'Usuário cadastrado com suceso',
                "user": UserSerializer(user).data
            }, status=HTTP_201_CREATED)
            
        print('Serializer: ', serializer.data['username'])
        username = serializer.data['username'].strip()
        verify_user = User.objects.filter(username=username).first()

        if verify_user:
            return Response({
            "detail": f'Já existe um usuário cadastro com {username}. Por favor, altere seu nome de usuário.'
        }, status=HTTP_400_BAD_REQUEST)
        
        return Response({
            "detail": 'Não foi possível realizar seu cadastro. Verifique suas informações!'
        }, status=HTTP_400_BAD_REQUEST)
        
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username').strip()
        print(username)
        
        user = User.objects.filter(username=username).first()

        if not user:
            novo_user = User.objects.create(
                username=username,
                telefone='99999999'
            )

            return Response({
                "detail": 'Usuário autenticado com succeso!',
                "id": novo_user.id,
                "user": novo_user.username,
                "telefone": novo_user.telefone,
            }, status=HTTP_201_CREATED)


        if user:
            return Response({
                "detail": 'Usuário autenticado com succeso!',
                "id": user.id,
                "user": user.username,
                "telefone": user.telefone,
            }, status=HTTP_201_CREATED)
            
        if not username:
            return Response({
                "detail": 'Você precisa informar seu nome de usuário!'
            }, status=HTTP_400_BAD_REQUEST)
            
        return Response({
            "detail": f'Não existe cadastro para: {username}. Verifique suas informações e tente novamente. '
        }, status=HTTP_400_BAD_REQUEST)
