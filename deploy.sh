#!/bin/bash

# 🚀 Script de deploy automático de develop → main (versión estable para Windows)
set -e  # Detiene el script si ocurre un error

start_time=$(date +%s)

echo "=== Cambiando a develop ==="
git checkout develop

echo "=== Ejecutando build ==="
npm run build

echo "=== Copiando build temporalmente ==="
# Copia el dist mientras estamos en develop
mkdir -p /tmp/deploy_dist
rm -rf /tmp/deploy_dist/*
cp -r dist/* /tmp/deploy_dist/

echo "=== Cambiando a main ==="
git checkout main

echo "=== Limpiando rama main (excepto .gitignore, node_modules y .env) ==="
if [ -f ".gitignore" ]; then
  cp .gitignore /tmp/.gitignore_backup
fi

find . -mindepth 1 -maxdepth 1 \
  ! -name '.git' \
  ! -name '.gitignore' \
  ! -name 'node_modules' \
  ! -name '.env' \
  -exec rm -rf {} +

if [ -f "/tmp/.gitignore_backup" ]; then
  mv /tmp/.gitignore_backup .gitignore
fi

echo "=== Copiando archivos desde /tmp/deploy_dist a main ==="
cp -r /tmp/deploy_dist/* .
rm -rf /tmp/deploy_dist

echo "=== Haciendo commit y push ==="
git add .
git commit -m "🚀 Deploy automático desde develop"
git push origin main

echo "=== Volviendo a develop ==="
git checkout develop

end_time=$(date +%s)
elapsed=$((end_time - start_time))

echo "✅ Deploy completado correctamente en ${elapsed}s"

# Elimina /tmp/deploy_dist
rm -rf /tmp/deploy_dist