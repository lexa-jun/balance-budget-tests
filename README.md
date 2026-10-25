# Balance Budget Tests

Независимые браузерные тесты приложения «Баланс». Репозиторий содержит Playwright-сценарии и приватный composite action, который запускает их против точного checkout приложения `balance-budget`.

## Локальный запуск

```powershell
npm ci
npx playwright install chromium
$env:BALANCE_APP_ROOT = "C:\path\to\balance-budget"
npm test
```

## Использование из GitHub Actions

Reusable workflow из этого репозитория checkout-ит переданный commit приложения, запускает composite action и публикует Playwright-отчёт при ошибке. Деплой приложения должен зависеть от успешного завершения этого workflow.

Для приватного использования в `Settings → Actions → General → Access` этого репозитория необходимо разрешить доступ другим приватным репозиториям владельца `lexa-jun`.
