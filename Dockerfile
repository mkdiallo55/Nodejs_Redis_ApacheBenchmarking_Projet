# Image de base
FROM node:alpine

# Installer l'outil de benchmarking Apache et les dépendances
RUN apk add --no-cache apache2-utils

# Spécifier un répertoire de travail
WORKDIR /usr/app

# Copier le fichier package.json et installer les dépendances
COPY ./package.json ./
RUN npm install

# Copier les autres fichiers de l'application
COPY ./ ./

# Commande par défaut pour démarrer l'application
CMD ["npm", "start"]
