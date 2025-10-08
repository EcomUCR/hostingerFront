#!/bin/bash

# 🚀 Script de deploy automático de develop → main (versión Windows-safe)
set -e  # Detiene el script si ocurre un error

start_time=$(date +%s)

echo "=== Cambiando a develop ==="
git checkout develop

echo "=== Ejecutando build ==="
npm run build

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

echo "=== Copiando archivos de dist (desde develop local) ==="
# Copia temporal del dist local desde develop
git checkout develop --quiet
mkdir -p ../deploy_temp
cp -r dist/* ../deploy_temp/

# Volvemos a main y movemos los archivos
git checkout main --quiet
cp -r ../deploy_temp/* .
rm -rf ../deploy_temp

echo "=== Haciendo commit y push ==="
git add .
git commit -m "🚀 Deploy automático desde develop"
git push origin main

echo "=== Volviendo a develop ==="
git checkout develop

end_time=$(date +%s)
elapsed=$((end_time - start_time))

echo "✅ Deploy completado correctamente en ${elapsed}s"
