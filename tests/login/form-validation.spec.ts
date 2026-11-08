import { test, expect } from '@playwright/test';

test.describe('Autenticación - Login', () => {
  test('Validación de campos vacíos y formato de email', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: 'Ingresa tu email' });
    const passwordInput = page.getByRole('textbox', { name: 'Ingresa tu contraseña' });
    const submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });

    // 1. Abrir login desde un estado limpio y dejar ambos campos vacíos.
    await page.goto('https://www.laboratoriodetesting.com/auth/login');
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();
    await expect(submitButton).toBeDisabled();

    // 2. Completar ambos campos con un email mal formado e intentar enviar.
    await emailInput.fill('correo-invalido');
    await passwordInput.fill('Clave-para-test');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();
    await expect(page.getByText('Email inválido')).toBeVisible();
    await expect(page).toHaveURL('https://www.laboratoriodetesting.com/auth/login');
    await expect(page.getByRole('dialog', { name: 'Error' })).toHaveCount(0);

    // 3. Probar email vacío con contraseña y email válido con contraseña vacía.
    await emailInput.fill('');
    await expect(submitButton).toBeDisabled();
    await passwordInput.fill('');
    await emailInput.fill('juanduarte@test.com');
    await expect(submitButton).toBeDisabled();
  });
});
