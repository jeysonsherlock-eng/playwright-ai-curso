import { test, expect } from '@playwright/test';

test.describe('Formulario de Login - Laboratorio de Testing', () => {
  test('debe mostrar mensaje de error al intentar iniciar sesión con credenciales inválidas', async ({ page }) => {
    // 1. Navegar a la página de login
    await page.goto('https://www.laboratoriodetesting.com/auth/login');

    // Verificar que estamos en la página de login comprobando el encabezado principal
    await expect(page.getByRole('heading', { name: 'Inicia Sesión', level: 1 })).toBeVisible();

    // 2. Localizar los campos mediante el árbol de accesibilidad (locators semánticos recomendados por Playwright)
    const emailInput = page.getByPlaceholder('Ingresa tu email');
    const passwordInput = page.getByPlaceholder('Ingresa tu contraseña');
    const submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });

    // Verificar que el botón de envío inicia en estado deshabilitado
    await expect(submitButton).toBeDisabled();

    // 3. Rellenar credenciales inválidas (usuario no registrado)
    await emailInput.fill('usuario_invalido@test.com');
    await passwordInput.fill('ContraseñaInvalida123!');

    // El botón se habilita al haber completado ambos campos
    await expect(submitButton).toBeEnabled();

    // 4. Intentar iniciar sesión
    await submitButton.click();

    // 5. Verificar que aparece el modal de error y validar su contenido semánticamente
    const errorDialog = page.getByRole('dialog');
    await expect(errorDialog).toBeVisible();

    // Validar el título del modal
    await expect(errorDialog.getByRole('heading', { name: 'Error' })).toBeVisible();

    // Validar el mensaje de error exacto dentro del diálogo
    await expect(
      errorDialog.getByText('No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.')
    ).toBeVisible();

    // Validar la presencia del botón de confirmación/cierre y cerrarlo
    const volverButton = errorDialog.getByRole('button', { name: 'Volver' });
    await expect(volverButton).toBeVisible();
    await volverButton.click();

    // Confirmar que el diálogo se cierra
    await expect(errorDialog).not.toBeVisible();
  });
});
