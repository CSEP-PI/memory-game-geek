#!/bin/sh

: "${DB_HOST:=db}"
: "${DB_PORT:=3306}"

echo "Aguardando o MySQL em ${DB_HOST}:${DB_PORT}..."

until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Banco de dados ainda não disponível..."
  sleep 1
done

echo "Banco de dados disponível. Executando migrações..."
python manage.py migrate

echo "Iniciando o servidor Django..."
exec "$@"
