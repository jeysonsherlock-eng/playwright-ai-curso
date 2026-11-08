# Plan de pruebas: Login

## Application Overview

Plan funcional para el flujo de autenticación de Laboratorio de Testing en https://www.laboratoriodetesting.com/auth/login. Historia de usuario: como usuario registrado quiero poder ingresar con mi email y password; si las credenciales son inválidas quiero ver un mensaje de error claro. La exploración observó acceso exitoso con la cuenta de prueba juanduarte@test.com y, para credenciales inválidas, un diálogo titulado “Error” con el mensaje “No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.”. No almacenar contraseñas reales en este plan; usar el secreto de prueba aprobado por el equipo.

## Test Scenarios

### 1. Autenticación - Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Acceso exitoso con credenciales válidas

**File:** `tests/login/happy-path.spec.ts`

**Steps:**
  1. Iniciar desde un estado limpio y navegar a https://www.laboratoriodetesting.com/auth/login.
    - expect: Se muestra la página de login con los campos Email y Contraseña y el botón Iniciar Sesión.
  2. Ingresar el email juanduarte@test.com y la contraseña válida de la cuenta de prueba, obtenida del almacén seguro aprobado.
    - expect: Los campos aceptan los valores y el botón Iniciar Sesión queda habilitado.
  3. Activar Iniciar Sesión una sola vez y esperar la respuesta de autenticación.
    - expect: El usuario sale de la ruta /auth/login y llega a la página de inicio autenticado.
    - expect: La navegación muestra opciones autenticadas como Mi Cuenta y Cerrar Sesión.
    - expect: No aparece un diálogo de error ni un estado de carga bloqueado.

#### 1.2. Mensaje claro al usar una contraseña incorrecta

**File:** `tests/login/invalid-password.spec.ts`

**Steps:**
  1. Iniciar desde un estado limpio, navegar a /auth/login e ingresar el email juanduarte@test.com junto con una contraseña deliberadamente incorrecta.
    - expect: El botón Iniciar Sesión queda habilitado al completar ambos campos.
  2. Enviar el formulario.
    - expect: La sesión no se inicia y se permanece en el flujo de login.
    - expect: Se presenta un mensaje de error visible y comprensible que indica que no se pudo iniciar sesión con esas credenciales y que se intente de nuevo.
    - expect: El aviso se identifica como error y ofrece una acción para cerrarlo o volver al formulario.
  3. Cerrar el aviso con la acción disponible.
    - expect: El diálogo desaparece y el formulario vuelve a estar disponible para corregir los datos.
    - expect: No se muestra contenido sensible de autenticación en el mensaje.

#### 1.3. Mensaje claro para un email sin cuenta

**File:** `tests/login/unknown-email.spec.ts`

**Steps:**
  1. Iniciar desde un estado limpio y abrir /auth/login.
    - expect: Se muestra el formulario de login.
  2. Ingresar un email con formato válido que no corresponda a una cuenta y una contraseña no vacía.
    - expect: El botón Iniciar Sesión queda habilitado.
  3. Enviar el formulario.
    - expect: No se inicia una sesión.
    - expect: Se muestra un error claro y accionable; el contenido no revela si el email está registrado, salvo que esa política esté explícitamente aprobada.
    - expect: El usuario puede cerrar el error y volver a intentar.

#### 1.4. Validación de campos vacíos y formato de email

**File:** `tests/login/form-validation.spec.ts`

**Steps:**
  1. Iniciar desde un estado limpio y abrir /auth/login. Dejar ambos campos vacíos.
    - expect: El botón Iniciar Sesión permanece deshabilitado o se impide el envío con validación visible.
  2. Escribir un email con formato inválido y una contraseña no vacía.
    - expect: La interfaz marca el email inválido con un mensaje asociado al campo o impide el envío.
    - expect: No se envía la solicitud de autenticación.
  3. Borrar el email, dejarlo vacío y completar la contraseña; luego probar el caso inverso con email válido y contraseña vacía.
    - expect: Cada combinación incompleta impide el envío y comunica cuál campo requiere atención.
    - expect: El foco o la asociación accesible permite identificar el campo con error.

#### 1.5. Reintento después de credenciales inválidas

**File:** `tests/login/retry-after-error.spec.ts`

**Steps:**
  1. Iniciar desde un estado limpio y enviar credenciales incorrectas hasta que aparezca el aviso de error.
    - expect: El aviso de credenciales inválidas aparece sin autenticar al usuario.
  2. Cerrar el aviso, reemplazar los datos por el email y contraseña válidos de la cuenta de prueba, y enviar de nuevo.
    - expect: El usuario puede reintentar sin recargar manualmente la página.
    - expect: El segundo envío autentica al usuario y muestra la navegación autenticada.
    - expect: El error anterior desaparece y no se presenta de nuevo tras un acceso exitoso.
