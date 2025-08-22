# Usar a imagem oficial do Node.js
FROM node:18 AS builder

WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY frontend/package*.json ./

# Instalar as dependências do frontend
RUN npm install

# Copiar o restante do código do frontend
COPY ./frontend ./


# Build the app
RUN npm run build



# Step 2: Use an Nginx image to serve the static files
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
