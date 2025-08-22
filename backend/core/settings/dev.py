from .base import *

DEBUG = True

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['*'])
#CORS_ALLOWED_ORIGINS =  env.list('CORS_ALLOWED_ORIGINS', default=[''])
CORS_ALLOW_ALL_ORIGINS = True

#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.mysql',
#        'NAME': env('MYSQL_DATABASE'),
#        'USER': env('MYSQL_USER'),
#        'PASSWORD': env('MYSQL_PASSWORD'),
#        'HOST': env('MYSQL_HOST', default='localhost'),
#        'PORT': env('MYSQL_PORT', default=3306),
#    }
#}

#CORS_ALLOWED_ORIGINS = [
#    env('FRONTEND_URL', default='http://localhost:3000'),  # URL do frontend
#]
