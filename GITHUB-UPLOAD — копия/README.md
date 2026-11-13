# MODUS PULSE — Система обратной связи и развития ГК «Модус Трейд» 🚀

Готовое решение для хакатона ГК «Модус Трейд», подготовленное для моментального развертывания на **Vercel**.

## ⚡ Способы публикации на Vercel (выберите любой за 1 минуту):

### Вариант 1: Через GitHub (самый популярный и рекомендуемый)
1. Создайте новый репозиторий на GitHub (например, `modus-pulse`).
2. В папке проекта выполните:
   ```bash
   git init
   git add .
   git commit -m "feat: modus-pulse hackathon release"
   git branch -M main
   git remote add origin https://github.com/<ваш-логин>/<ваш-репозиторий>.git
   git push -u origin main
   ```
3. Зайдите на [vercel.com](https://vercel.com) ➔ **Add New...** ➔ **Project**.
4. Выберите ваш репозиторий. Vercel сам определит **Vite Framework** и настройки:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Нажмите **Deploy** — через 20 секунд сайт будет доступен по публичной ссылке вида `https://modus-pulse.vercel.app`!

---

### Вариант 2: Через Vercel CLI (прямо из командной строки)
Если у вас установлен Vercel:
```bash
npx vercel
```
- На все вопросы нажимайте `Enter`.
- Для продакшн-деплоя: `npx vercel --prod`.

---

### Вариант 3: Ручная загрузка готовой сборки (Drag & Drop)
Папка `dist` уже полностью скомпилирована. Вы можете загрузить её прямо в панель Vercel без сборки!
