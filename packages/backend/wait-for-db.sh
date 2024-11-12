#!/bin/sh

until nc -z -v -w30 database 5432
do
  echo "Esperando a la base de datos..."
  sleep 1
done

echo "Base de datos disponible. Ejecutando migraciones..."
npx prisma migrate dev --name init --schema=./packages/backend/prisma/schema.prisma
npx prisma generate --schema=./packages/backend/prisma/schema.prisma
exec "$@"
