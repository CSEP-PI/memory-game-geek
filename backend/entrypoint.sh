#!/bin/sh

: "${DB_HOST:=db}"
: "${DB_PORT:=3306}"

echo "Aguardando o MySQL em ${DB_HOST}:${DB_PORT}..."

while nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Banco de dados ainda não disponível..."
  sleep 1
done

echo "Banco de dados Pronto!!"

echo "Configurando Backend.."
python manage.py migrate
python manage.py collectstatic --noinput


python manage.py loaddata backup_refeito.json

echo "Criando Superusuário..."
python manage.py shell <<EOF
from django.contrib.auth import get_user_model

# Criar superusuário vinculado ao enterprise
if not User.objects.filter(email='admin@admin.com').exists():
    User.objects.create_superuser(
      username='admin',
      email='admin@admin.com',
      password='admin',
    )
EOF

echo "Iniciando o servidor Django..."

#exec python manage.py runserver 0.0.0.0:8000
exec gunicorn core.wsgi:application --bind 0.0.0.0:8001
