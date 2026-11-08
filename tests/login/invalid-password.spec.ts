import { test, expect } from '@playwright/test';

test.describe('Autenticación - Login', () => {
  test('Mensaje claro al usar una contraseña incorrecta', async ({ page }) => {
    // 1. Abrir un formulario de login limpio e ingresar el email conocido y una contraseña incorrecta.
    await page.goto('https://www.laboratoriodetesting.com/auth/login');
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Ingresa tu email' }).fill('juanduarte@test.com');
    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).fill('ClaveIncorrecta-para-test');
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeEnabled();

    // 2. Enviar el formulario y comprobar que el error es visible y claro.
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await expect(page).toHaveURL('https://www.laboratoriodetesting.com/auth/login');
    const errorDialog = page.getByRole('dialog', { name: 'Error' });
    await expect(errorDialog).toBeVisible();
    await expect(errorDialog).toContainText('No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.');
    await expect(errorDialog.getByRole('button', { name: 'Volver' })).toBeVisible();

    // 3. Cerrar el aviso y comprobar que el formulario vuelve a estar disponible.
    await errorDialog.getByRole('button', { name: 'Volver' }).click();
    await expect(errorDialog).toHaveCount(0);
    await expect(page.getByRole('textbox', { name: 'Ingresa tu email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Ingresa tu contraseña' })).toBeVisible();
  });
});
