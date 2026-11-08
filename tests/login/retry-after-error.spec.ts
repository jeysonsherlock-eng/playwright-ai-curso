import { test, expect } from '@playwright/test';

test.describe('Autenticación - Login', () => {
  test('Reintento después de credenciales inválidas', async ({ page }) => {
    // 1. Abrir el login y enviar credenciales incorrectas para obtener el aviso de error.
    await page.goto('https://www.laboratoriodetesting.com/auth/login');
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Ingresa tu email' }).fill('juanduarte@test.com');
    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).fill('ContrasenaIncorrecta-para-reintento');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    const errorDialog = page.getByRole('dialog', { name: 'Error' });
    await expect(errorDialog).toBeVisible();
    await expect(errorDialog).toContainText('No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.');
    await expect(page).toHaveURL('https://www.laboratoriodetesting.com/auth/login');

    // 2. Cerrar el aviso, corregir las credenciales y reintentar sin recargar.
    await errorDialog.getByRole('button', { name: 'Volver' }).click();
    await expect(errorDialog).toHaveCount(0);
    await page.getByRole('textbox', { name: 'Ingresa tu email' }).fill('juanduarte@test.com');
    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).fill('12345678');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await expect(page).toHaveURL('https://www.laboratoriodetesting.com/');
    await expect(page.getByRole('link', { name: 'Mi Cuenta' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cerrar Sesión' })).toBeVisible();
    await expect(errorDialog).toHaveCount(0);
  });
});
