#!/bin/bash

# 🚀 Script de deploy automático de develop → main
echo "=== Cambiando a develop ==="
git checkout develop

echo "=== Ejecutando build ==="
npm run build

echo "=== Cambiando a main ==="
git checkout main

echo "=== Limpiando rama main ==="
git rm -rf .

echo "=== Copiando archivos de dist ==="
git checkout develop -- dist
cp -r dist/* .
rm -rf dist

echo "=== Haciendo commit y push ==="
git add .
git commit -m "Deploy automático desde develop"
git push origin main

echo "=== Volviendo a develop ==="
git checkout develop

echo "✅ Deploy completado correctamente"
