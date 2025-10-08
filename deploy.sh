#!/bin/bash

# 🚀 Script de deploy automático de develop → main (versión segura)
set -e  # Detiene el script si ocurre un error

echo "=== Cambiando a develop ==="
git checkout develop

echo "=== Ejecutando build ==="
npm run build

echo "=== Cambiando a main ==="
git checkout main

echo "=== Limpiando rama main (excepto .gitignore, node_modules y .env) ==="
# Guarda temporalmente el .gitignore si existe
if [ -f ".gitignore" ]; then
  cp .gitignore /tmp/.gitignore_backup
fi

# Elimina todo menos .git, .gitignore, node_modules y .env
find . -mindepth 1 -maxdepth 1 \
  ! -name '.git' \
  ! -name '.gitignore' \
  ! -name 'node_modules' \
  ! -name '.env' \
  -exec rm -rf {} +

# Restaura el .gitignore si se guardó
if [ -f "/tmp/.gitignore_backup" ]; then
  mv /tmp/.gitignore_backup .gitignore
fi

echo "=== Copiando archivos de dist (local, no con Git) ==="
# Volvemos momentáneamente a develop para copiar el build local
git checkout develop --quiet
mkdir -p /tmp/deploy_dist
cp -r dist/* /tmp/deploy_dist/

# Volvemos a main y copiamos el contenido
git checkout main --quiet
cp -r /tmp/deploy_dist/* .
rm -rf /tmp/deploy_dist

echo "=== Haciendo commit y push ==="
git add .
git commit -m "🚀 Deploy automático desde develop"
git push origin main

echo "=== Volviendo a develop ==="
git checkout develop

echo "✅ Deploy completado correctamente"
