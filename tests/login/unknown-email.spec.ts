import { test, expect } from '@playwright/test';

test.describe('Autenticación - Login', () => {
  test('Mensaje claro para un email sin cuenta', async ({ page }) => {
    // 1. Abrir el formulario de login desde un estado limpio.
    await page.goto('https://www.laboratoriodetesting.com/auth/login');
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Ingresa tu email' })).toBeVisible();

    // 2. Ingresar un email válido sin cuenta y una contraseña no vacía.
    await page.getByRole('textbox', { name: 'Ingresa tu email' }).fill('cuenta.no.existe.2026@example.com');
    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).fill('CualquierClave-para-test');
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeEnabled();

    // 3. Enviar el formulario y verificar que el error no revela el estado de registro del email.
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await expect(page).toHaveURL('https://www.laboratoriodetesting.com/auth/login');
    const errorDialog = page.getByRole('dialog', { name: 'Error' });
    await expect(errorDialog).toBeVisible();
    await expect(errorDialog).toContainText('No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.');
    await expect(errorDialog.getByRole('button', { name: 'Volver' })).toBeVisible();
    await errorDialog.getByRole('button', { name: 'Volver' }).click();
    await expect(errorDialog).toHaveCount(0);
    await expect(page.getByRole('textbox', { name: 'Ingresa tu email' })).toBeVisible();
  });
});
