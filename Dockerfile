# 1. On part d'une image de base contenant un serveur web léger (Nginx)
FROM nginx:alpine

# 2. On copie tous les fichiers du projet (le '.') dans le dossier public du serveur web
COPY . /usr/share/nginx/html