# Configuración del proyecto

## Require node 22 o superior

## Instalar dependencias

```bash
# 
$ yarn install
```

## Crear .env

Ubicar el archivo `.env.sample` y renombrarla a `.env`

## Crear tablas

```bash
#
$ npx prisma db push
```

## Ejecutar Seeders

```bash
#
$ yarn seed
```

NOTA: si falla, eliminar el archivo `project-name.backend\prisma\projectDB.db` y ejecuta nuevamente `npx prisma db push` y luego `yarn seed`

## Compilar y ejecutar el proyecto

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Usuario Para iniciar sesión

correo: `admin@fake.com`

contrasena: `123456`

### CORS Habilitado, con origen para `http://localhost:4000`
