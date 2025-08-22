
FROM python:3.13-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Preparando ambiente
RUN apt-get update && apt-get install -y build-essential default-libmysqlclient-dev pkg-config

# Definir a pasta base 
WORKDIR /app

# Requirments
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#copia os arquivos
COPY . .

# entrypoints
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

#Expoem a porta 8000 do container
EXPOSE 8001
