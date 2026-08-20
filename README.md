# extraclase-cicd-app

Aplicación Express de ejemplo para el Extraclase 1 — CI/CD con GitHub Actions (Programación IV, UNA).

## Endpoints

- `GET /health` — verificación de salud del servicio.
- `GET /sum?a=&b=` — suma dos números.
- `POST /users` — crea un usuario (`{ name, email }`).
- `GET /users` — lista los usuarios creados.

## Ejecutar localmente

```bash
npm install
npm run lint
npm test
npm start
```

## Estructura

```
.github/workflows/
├── ci.yml       # Ejercicio 1: lint, tests, cobertura como artifact
├── cd.yml       # Ejercicio 2: build Docker + push a GHCR + deploy
└── matrix.yml   # Ejercicio 3: matriz Node 18/20/22 x ubuntu/windows
src/
├── app.js       # Lógica de la aplicación
└── server.js    # Arranque del servidor
tests/
└── app.test.js  # 10 pruebas unitarias
Dockerfile
```

## Pasos para dejar esto funcionando en tu repositorio (Ejercicio 1)

1. Crea un repositorio público en GitHub y sube este contenido.
2. Con solo el push, `ci.yml` ya se dispara en `push` a `main`/`develop` y en `pull_request` hacia `main`.
3. Verifica en la pestaña **Actions** de GitHub que el job corra en verde y que el artifact `coverage-report` quede disponible para descarga — esa es tu captura de evidencia.

## Pasos para el Ejercicio 2 (CD)

`cd.yml` hace dos cosas: construye y publica la imagen Docker en GitHub Container Registry (no necesita ninguna cuenta externa, solo el `GITHUB_TOKEN` que ya provee GitHub), y luego dispara un despliegue en Render mediante un *Deploy Hook*.

1. **Crear el environment protegido** (requisito de la rúbrica):
   - En el repo: `Settings` → `Environments` → `New environment` → nombre `production`.
   - Agrega una regla de protección, por ejemplo *Required reviewers* (tú mismo como aprobador) o un *wait timer*.
2. **Cuenta gratuita en Render** (o cambia por Railway/Fly.io si prefieres):
   - Crea un *Web Service* nuevo conectado a tu repo (o usa "Deploy an existing image" apuntando a `ghcr.io/tu-usuario/tu-repo:latest`, que es lo que este pipeline publica).
   - En Render, copia el **Deploy Hook URL** del servicio.
3. **Guardar el secret en GitHub**: `Settings` → `Secrets and variables` → `Actions` → `New repository secret` → nombre `RENDER_DEPLOY_HOOK`, valor la URL copiada.
4. (Opcional) Agrega una variable de repo `PRODUCTION_URL` con la URL pública de tu servicio, para que aparezca como link en el environment.
5. Haz un push a `main` que pase CI y verifica en Actions que `cd.yml` se dispare automáticamente al terminar `CI Pipeline`, y que el despliegue en Render se refleje en su dashboard — esas son tus capturas de evidencia.

## Ejercicio 3 (matriz)

`matrix.yml` corre las pruebas en Node 18/20/22 combinado con `ubuntu-latest`/`windows-latest` (excluyendo Node 18 + Windows), con `fail-fast: false`. Se puede disparar manualmente desde la pestaña Actions (`workflow_dispatch`) para tomar la captura de las 5 combinaciones ejecutándose en paralelo.
