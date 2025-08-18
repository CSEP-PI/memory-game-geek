from django.db import models
from users.models import User
from temas.models import Anime

# Create your models here.
class Jogo(models.Model):
    DIFICULDADE = [
        ('D', 'Difícil'),
        ('M', 'Médio'),
        ('F', 'Fácil'),
    ]
    
    usuario = models.ForeignKey(User, on_delete=models.PROTECT)
    anime = models.ForeignKey(Anime, on_delete=models.PROTECT, related_name='anime_jogo')
    qtd_jogadas = models.IntegerField(blank=False, null=False)
    qtd_quiz = models.IntegerField(blank=False, null=False)
    tempo = models.BigIntegerField(blank=False, null=False)
    dificuldade = models.CharField(max_length=1, choices=DIFICULDADE, blank=False, null=False, default='F')
    
    class Meta:
        db_table = 'jogo'
        
    def __str__(self):
        return f'{self.usuario.username} -> {self.anime.nome} -> {self.dificuldade}'
    
class Questao(models.Model):
    DIFICULDADE = [
        ('D', 'Difícil'),
        ('M', 'Médio'),
        ('F', 'Fácil'),
    ]
    
    anime = models.ForeignKey(Anime, on_delete=models.PROTECT, related_name='anime_questao')
    pergunta = models.TextField(blank=False, null=False)
    dificuldade = models.CharField(max_length=1, choices=DIFICULDADE, blank=False, null=False)
    
    class Meta:
        db_table = 'questao'
        
    def __str__(self):
        return f'{self.id} - {self.pergunta}'
    
class Resposta(models.Model):
    questao = models.ForeignKey(Questao, on_delete=models.CASCADE)
    descricao = models.TextField(blank=False, null=False)
    is_correct = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'resposta'
        
    def __str__(self):
        return f'{self.id} - {self.descricao}'