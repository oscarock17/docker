# Imagen base de Node.js
FROM node:22-alpine

# Crear carpeta y copiar el código
WORKDIR /app
COPY app.js .

# Exponer el puerto
EXPOSE 3000

# Ejecutar la app
CMD ["node", "app.js"]