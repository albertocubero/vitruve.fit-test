# Use a Node.js base image
FROM node:18-alpine

# Install net-tools to have netstat available
# RUN apt-get update && apt-get install -y iproute2 net-tools

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar las dependencias primero
COPY package.json package-lock.json nx.json ./
COPY packages/frontend/package.json ./packages/frontend/
COPY tsconfig.base.json ./

# Copia solo el código del frontend
COPY packages/frontend ./packages/frontend

# Install Nx globally
RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install -g nx
# RUN corepack enable

# Clean previous node_modules and lock files, just in case
# RUN pnpm install
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port that your frontend app runs on
EXPOSE 4200

# Command to run your Nx frontend app in development mode
CMD ["nx", "run", "frontend:serve:development"]
