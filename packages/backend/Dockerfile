# Usa una imagen de Node.js como base
FROM node:18-alpine

# Instala nc (Netcat) para la comprobación de puertos
# RUN apt-get update && apt-get install -y netcat-openbsd

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración de la raíz necesarios para instalar dependencias
COPY package.json package-lock.json nx.json ./
COPY packages/backend/package.json ./packages/backend/
COPY tsconfig.base.json ./

# Copia solo el código del backend
COPY packages/backend ./packages/backend

# Install Nx globally
RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install -g nx
# RUN corepack enable

# Clean previous node_modules and lock files, just in case
RUN npm install

# Copy the project files
COPY . .

# Expone el puerto donde escucha tu servidor backend
EXPOSE 3000

# Ejecuta el backend en producción
CMD ["nx", "run", "backend:serve:development"]