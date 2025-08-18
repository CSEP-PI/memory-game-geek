from django.db import models

class User(models.Model):
    username = models.CharField(max_length=200, unique=True, blank=False, null=False)
    telefone = models.CharField(max_length=11, blank=False, null=False)
    
    class Meta:
        db_table = 'user'
        
    def __str__(self):
        return self.username