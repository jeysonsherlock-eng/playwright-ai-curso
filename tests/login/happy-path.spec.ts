import { test, expect } from '@playwright/test';

test.describe('Autenticación - Login', () => {
  test('Acceso exitoso con credenciales válidas', async ({ page }) => {
    // 1. Iniciar desde un estado limpio y navegar a la página de login.
    await page.goto('https://www.laboratoriodetesting.com/auth/login');
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Ingresa tu email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Ingresa tu contraseña' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeDisabled();

    // 2. Ingresar el email y la contraseña de la cuenta de prueba válida.
    await page.getByRole('textbox', { name: 'Ingresa tu email' }).fill('juanduarte@test.com');
    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).fill('12345678');
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeEnabled();

    // 3. Enviar las credenciales una vez y verificar que se inicia sesión.
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await expect(page).toHaveURL('https://www.laboratoriodetesting.com/');
    await expect(page.getByRole('link', { name: 'Mi Cuenta' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cerrar Sesión' })).toBeVisible();
    await expect(page.getByRole('dialog', { name: 'Error' })).toHaveCount(0);
  });
});
