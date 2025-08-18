from django.db import models

class Anime(models.Model):
    nome = models.CharField(max_length=200, blank=False, null=False)
    descricao = models.TextField(blank=True, null=True)
    capa_img = models.ImageField(upload_to='capas')
    fundo_img = models.ImageField(upload_to='fundos')
    
    class Meta:
        db_table = 'anime'
        
    def __str__(self):
        return self.nome
    
class Carta(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE)
    carta_img = models.ImageField(upload_to='cartas')
    
    class Meta:
        db_table = 'carta'
        
    def __str__(self):
        return f'carta de {self.anime.nome}'