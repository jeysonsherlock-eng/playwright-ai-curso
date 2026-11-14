# Suite de Pruebas Automatizadas E2E - Laboratorio de Testing

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

Repositorio de pruebas automatizadas End-to-End (E2E) desarrollado con **Playwright** y **TypeScript** para validar los flujos críticos de la plataforma **[Laboratorio de Testing](https://www.laboratoriodetesting.com/)**, con énfasis en el módulo de autenticación y flujos asistidos por agentes de IA (Playwright Agents + MCP).

---

## Tabla de Contenidos

1. [Descripción General](#-descripción-general)
2. [Requisitos Previos](#-requisitos-previos)
3. [Instalación y Configuración](#-instalación-y-configuración)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Ejecución de Pruebas](#-ejecución-de-pruebas)
6. [Cobertura de Escenarios](#-cobertura-de-escenarios)
7. [Agentes de Playwright (IA)](#-agentes-de-playwright-ia)
8. [Buenas Prácticas Implementadas](#-buenas-prácticas-implementadas)
9. [Integración Continua (CI/CD)](#-integración-continua-cicd)

---

## Descripción General

Este proyecto implementa pruebas funcionales automatizadas sobre **Laboratorio de Testing**, garantizando que los flujos de usuario funcionen correctamente en múltiples motores de navegación (**Chromium**, **Firefox** y **WebKit**).

Además del enfoque tradicional de automatización, el repositorio incorpora la arquitectura de **Agentes de Playwright** (`Planner`, `Generator` y `Healer`), lo que permite:
- Explorar la aplicación y diseñar planes de prueba en Markdown (`specs/`).
- Generar especificaciones de prueba automatizadas a partir de planes estructurados (`tests/`).
- Diagnosticar y reparar pruebas ante cambios en la interfaz.

---

## Requisitos Previos

Asegúrate de contar con las siguientes herramientas instaladas en tu entorno local:

- **Node.js**: `v18.x` o superior (recomendado `v20 LTS`).
- **npm**: `v9.x` o superior (incluido con Node.js).
- **Git**: Para el control de versiones.

---

## Instalación y Configuración

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd PROYECTO
   ```

2. **Instalar las dependencias de Node.js:**
   ```bash
   npm install
   ```

3. **Instalar los navegadores y dependencias del sistema de Playwright:**
   ```bash
   npx playwright install --with-deps
   ```

---

## Estructura del Proyecto

```text
PROYECTO/
├── .claude/                        # Skills y referencias para asistencia con Claude / Playwright CLI
├── .github/
│   ├── agents/                     # Definición de Agentes de Playwright (Planner, Generator, Healer)
│   └── workflows/                  # Pipelines de CI/CD con GitHub Actions (playwright.yml)
├── .vscode/
│   └── mcp.json                    # Configuración del servidor MCP de Playwright
├── specs/                          # Planes de prueba funcionales en formato Markdown
│   ├── README.md
│   └── login-test-plan.md          # Plan detallado de pruebas para el módulo de Login
├── tests/                          # Suites de pruebas automatizadas E2E
│   ├── login/                      # Casos de prueba modulares del flujo de autenticación
│   │   ├── happy-path.spec.ts      # Inicio de sesión exitoso con credenciales válidas
│   │   ├── invalid-password.spec.ts# Validación de error con contraseña incorrecta
│   │   ├── unknown-email.spec.ts   # Validación de error con email no registrado
│   │   ├── form-validation.spec.ts # Validación de campos vacíos y formato de correo
│   │   └── retry-after-error.spec.ts # Reintento exitoso tras fallo de autenticación
│   ├── example.spec.ts             # Prueba base de ejemplo de Playwright
│   ├── login.spec.ts               # Prueba integral del formulario de login
│   └── seed.spec.ts                # Semilla de estado inicial para los agentes de pruebas
├── playwright.config.ts            # Configuración global de Playwright (browsers, paralelismo, trazas)
└── package.json                    # Dependencias y metadatos del proyecto
```

---

## Ejecución de Pruebas

### Comandos principales

| Acción | Comando |
| :--- | :--- |
| **Ejecutar todas las pruebas (Headless)** | `npx playwright test` |
| **Ejecutar pruebas con interfaz visual (UI Mode)** | `npx playwright test --ui` |
| **Ejecutar pruebas viendo el navegador (Headed)** | `npx playwright test --headed` |
| **Ejecutar solo la suite de Login** | `npx playwright test tests/login/` |
| **Ejecutar un archivo específico** | `npx playwright test tests/login/happy-path.spec.ts` |
| **Ejecutar en un navegador específico** | `npx playwright test --project=chromium` |
| **Ejecutar en modo depuración (Debug)** | `npx playwright test --debug` |
| **Abrir el último reporte HTML generado** | `npx playwright show-report` |

---

## Cobertura de Escenarios

El plan de pruebas actual (`specs/login-test-plan.md`) cubre los siguientes escenarios del flujo de **Autenticación (`/auth/login`)**:

1. **Acceso exitoso (`tests/login/happy-path.spec.ts`)**:
   - Verifica la redirección al inicio tras ingresar credenciales válidas y la visibilidad de opciones autenticadas (`Mi Cuenta`, `Cerrar Sesión`).
2. **Contraseña incorrecta (`tests/login/invalid-password.spec.ts`)**:
   - Comprueba que se despliegue el diálogo modal de error `"No pudimos iniciar sesión con estas credenciales. Intenta de nuevo."` sin iniciar sesión.
3. **Email no registrado (`tests/login/unknown-email.spec.ts`)**:
   - Valida el manejo seguro de errores ante cuentas inexistentes y el cierre limpio del modal informativo.
4. **Validación de formulario (`tests/login/form-validation.spec.ts`)**:
   - Asegura que el botón `Iniciar Sesión` permanezca deshabilitado o impida el envío cuando existen campos vacíos o formatos de email inválidos.
5. **Reintento tras error (`tests/login/retry-after-error.spec.ts`)**:
   - Confirma que el usuario pueda cerrar el diálogo de error, corregir sus credenciales e iniciar sesión sin necesidad de recargar la página.

---

## Agentes de Playwright (IA)

El proyecto incluye agentes especializados en `.github/agents/` integrados mediante **Model Context Protocol (MCP)**:

- **`playwright-test-planner`**: Explora la aplicación web en vivo utilizando `tests/seed.spec.ts` como punto de partida y redacta planes de prueba exhaustivos en `specs/`.
- **`playwright-test-generator`**: Transforma los escenarios definidos en `specs/` en archivos `.spec.ts` ejecutables dentro de `tests/`.
- **`playwright-test-healer`**: Ejecuta pruebas fallidas, inspecciona el DOM/trazas y corrige selectores o aserciones automáticamente.

---

## Buenas Prácticas Implementadas

- **Localizadores Semánticos y Accesibles**: Uso prioritario de `getByRole`, `getByPlaceholder` y `getByText` siguiendo las recomendaciones oficiales de Playwright para pruebas resilientes orientadas al usuario.
- **Aserciones Web-First (Auto-waiting)**: Uso de `await expect(...).toBeVisible()`, `toBeEnabled()`, `toBeDisabled()` y `toHaveURL()` para evitar esperas fijas (`waitForTimeout`) y reducir la inestabilidad (*flakiness*).
- **Aislamiento de Pruebas**: Cada `test` se ejecuta en un contexto de navegador limpio e independiente.
- **Ejecución Paralela (`fullyParallel: true`)**: Configurada en `playwright.config.ts` para optimizar los tiempos de respuesta.
- **Trazabilidad en Fallos (`trace: 'on-first-retry'`)**: Recolección automática de trazas en reintentos para facilitar el diagnóstico post-mortem con Playwright Trace Viewer.

---

## Integración Continua (CI/CD)

El flujo de trabajo de GitHub Actions está definido en `.github/workflows/playwright.yml`:
- Se ejecuta automáticamente en eventos `push` y `pull_request` hacia las ramas principales.
- Configura el entorno Node.js, instala dependencias y navegadores de Playwright.
- Ejecuta toda la suite de pruebas con `retries: 2` y `forbidOnly: true`.
- Almacena el reporte HTML (`playwright-report/`) como artefacto descargable tras cada ejecución.
