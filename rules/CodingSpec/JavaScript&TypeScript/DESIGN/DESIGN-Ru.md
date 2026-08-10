<!-- ovcr-locale-lock -->
---
description: Справка по UI-вёрстке, стилям, визуалу компонентов, теме и адаптивности (кросс-стеки · VibeCoding)
globs:
  - "**/*.vue"
  - "**/*.scss"
  - "**/*.less"
  - "src/**/*.css"
  - "**/layout/**"
  - "**/components/**"
  - "**/pages/**"
alwaysApply: false
---

# Нормы дизайна интерфейса (VibeCoding · puffseed)

> **Назначение**: источник дизайн-норм для агента при UI в продуктовом репозитории (визуальная система **puffseed**).  
> **Область**: vanilla HTML + CSS + JavaScript, Vue 2 / Vue 3, React 18+, **Next.js**, **UniApp**, Angular 12+, плагины uTools (React / Vue).  
> **Правило**: сначала режим проекта (`AGENTS.md` §0) и фреймворк, затем нужные разделы. В превью и брендинге сохранять **puffseed** / **puffseed-ui**.

---

## 1. Позиционирование дизайна (общее)

| Измерение | Пояснение |
|------|------|
| Стиль | Чистый tool-UI · семантические Token · карточная вёрстка |
| Философия | Умеренная плотность · читаемость · паритет светлой/тёмной темы |
| Token | Не хардкодить тему в продуктовых компонентах; только CSS-переменные |
| Изоляция | Стили компонента в компоненте · страницы — в странице · глобальные Token в `WebVariable/` |

Конкретные цвета и размеры — из **исходников Token** и **preview HTML**, не копировать hex в этот документ.

---

## 2. CSS-архитектура и Token

### 2.1 Слои стилей

```
rules/CodingSpec/JavaScript&TypeScript/WebVariable/     # Token + глобальный reset (единственный источник)
  ThemeVariable.css     # тема / текст
  SystemVariable.css    # отступы / кегль / тени
  ProjectReset.css      # reset браузера + база корня
src/ или app/           # импорт в точке входа фреймворка
layout/                 # только layout
components/             # переиспользуемые (scoped / CSS Modules)
pages/ или views/       # только страница
```

| Стек | Глобальный CSS | Изоляция компонентов |
|--------|------------------|-------------|
| Vanilla | `<link>` в `index.html` | BEM / page `<style>` |
| Vue 2 / 3 | `import` в `main.js` / `main.ts` | `<style scoped>` |
| UniApp | `App.vue` / `uni.scss`; учёт CSS vars в мини-программах | стили + `rpx`; условная компиляция |
| React 18+ | `import` в entry | CSS Modules / styled-components |
| Angular 12+ | `angular.json` `styles` | `styleUrls` + `:host` |

**Правило 1:1**: стили только в своём скоупе. Запрет магических цветов. Запрет переопределять Token из WebVariable.

### 2.2 Источники Token и импорт

| Файл | Роль |
|------|------|
| `ThemeVariable.css` | **Тема и текст** |
| `SystemVariable.css` | Отступы, макет, кегль, иконки, толщина рамки, рамки/тени |
| `ProjectReset.css` | Глобальный reset |

Порядок импорта:

```javascript
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css";
import "./main.css";
```

Расширение: цвета → ThemeVariable; размеры/макет → SystemVariable; reset — только при глобальной нужде.

### 2.3 Подключаемые стили

По умолчанию ThemeVariable + SystemVariable. Альтернативный бренд — **добавить** CSS в `WebVariable/` или `Extensions/`, не трогая ядро. См. `AGENTS.md` §2.5.

### 2.4 Индекс переменных

Цвета — ThemeVariable; размеры — SystemVariable. Проверка — Light/Dark PreView (не скармливать весь HTML ИИ).

| Категория | Примеры | Назначение |
|------|------|------|
| Бренд | `--primary` · hover/active/bg/border | Тема |
| Статусы | `--success` · `--warning` · `--info` · `--error` | Обратная связь |
| Утилиты | `--hover` · `--border` · `--bg` · `--white` | Поверхности |
| Текст (свет) | `--title` · `--main-text` · … | Светлый фон |
| Текст (тём) | `--title-dark` · … | Тёмный фон |
| Отступы | `--size-8` · `--size-16` · `--size-24` · `--size-48` | Поля |
| Макет | `--layout-header` · `--layout-footer` · `--layout-aside` · `--layout-content` | Шапка / подвал / сайдбар / контент |
| Кегль | `--fs-12` · `--fs-14` · `--fs-16` · `--fs-20` | Типографика |
| Иконки | `--wh-16` · `--wh-24` | Действия |
| Толщина рамки | `--border-fine` · `--border-1` | Ширина границы |
| Рамки/тени | `--line` · `--solid` · `--shadow` | через `var(--border)` |

---

## 3. Визуальные референсы

| Ресурс | Описание |
|------|------|
| `PreView/LightDesignSpec.html` | Светлая тема |
| `PreView/DarkDesignSpec.html` | Тёмная тема |

---

## 4. Типовые UI-паттерны

Те же SCSS-паттерны, что в Zh-CN / En: `.panel`, `.primary-btn`, `.secondary-btn`, `.code-block` на `var(--*)`. Фон кода `#1e1e2e` фиксирован для обеих тем. Переходы `0.15s~0.2s ease`.

```scss
.panel {
  background: var(--white);
  border: var(--solid);
  border-radius: var(--size-8);
  padding: var(--size-20);
  box-shadow: var(--shadow);
}
.primary-btn {
  background: var(--primary);
  color: var(--white);
  border: var(--solid);
  border-color: var(--primary);
  border-radius: var(--size-8);
}
.secondary-btn {
  background: var(--white);
  color: var(--title);
  border: var(--solid);
}
.code-block {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: var(--size-20);
  border-radius: var(--size-8);
  font-family: 'SF Mono', Consolas, Monaco, monospace;
}
```

---

## 5. Соответствие фреймворкам

| Сценарий | Vue 3 | UniApp | React / Next | Angular | Vanilla |
|------|-------|--------|--------------|---------|---------|
| Глобальные Token | `main.ts` | `App.vue` / `uni.scss` | entry / layout | `angular.json` | `<link>` |
| Стили компонента | SCSS scoped | + rpx | CSS Modules | `:host` | BEM |
| Динамика | `:style` | `:style` + `#ifdef` | `className` | `[ngStyle]` | classList |

---

## 6. Правила VibeCoding

### 6.1 Обязательно

1. Сначала Token  
2. Стили 1:1 по скоупам  
3. Переходы `0.15s~0.2s ease`  
4. Изоляция стилей  
5. Префикс `handle`; очистка эффектов при unmount  

### 6.2 Запрещено

1. Хардкод темы (кроме фиксированного фона кода)  
2. Переопределение Token WebVariable  
3. Вторая палитра вне архитектуры  
4. Правка ядра WebVariable без явного запроса  

### 6.3 Чеклист новой страницы

- [ ] WebVariable подключён на входе  
- [ ] Стили страницы только в её файле  
- [ ] Общие компоненты на Token  
- [ ] Вёрстка на 640px  
- [ ] Контраст свет/тём  

---

*Последняя синхронизация: `WebVariable/` · `AGENTS.md` · `PreView/`*
