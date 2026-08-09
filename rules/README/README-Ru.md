<!-- ovcr-locale-lock -->
<a id="ovcr-lang"></a>

> **Language / 语言**：[简体中文](../../README.md#ovcr-lang) · [繁體中文](./README-Zh-TW.md#ovcr-lang) · [English](./README-En.md#ovcr-lang) · [Русский](./README-Ru.md#ovcr-lang) · [日本語](./README-Ja.md#ovcr-lang)

# OpenVibeCodingRules

Следуйте OpenVibeCodingRules, чтобы убрать следы AI-кода, настроить свой дизайн и адаптировать личные / командные / зарубежные корпоративные проекты — веб, админки и VibeCoding (**puffseed**).

---

## Что это

OpenVibeCodingRules — репозиторий правил для **AI-assisted многоязычной разработки (VibeCoding)**. Включает:

- **Кодекс поведения**: как AI думает и меняет код (`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`)
- **База качества**: кросс-языковые стандарты / качество / сопровождаемость (`rules/QualityBaseline/QualityBaseline-Zh-CN.md`)
- **Инженерные правила по языкам** (`rules/CodingSpec/<язык>/`)
- **Фронтенд-дизайн и Token**: `DESIGN.md` · **WebVariable** (ранее VariableFile) · PreView

**Поддерживаемые языки и фреймворки** (популярные языки + бизнес-стек):

| Язык | Фреймворки / сценарии |
|------|----------------------|
| JavaScript & TypeScript | Vue, React, Next.js, UniApp |
| Node.js | NestJS, Express |
| Python | FastAPI, Django |
| Java | Spring Boot |
| Go | Gin |
| PHP | Laravel |
| C | Системы / embedded / C ABI |
| C++ | Современный C++ · CMake / Qt |
| C# | ASP.NET Core · .NET |
| Rust | Axum / Actix · Tokio |
| SQL | PostgreSQL / MySQL / SQL Server |
| R | tidyverse / Shiny |
| Kotlin | Ktor / Spring / Android |
| Swift | SwiftUI / Vapor |
| Dart | Flutter |
| Ruby | Rails |
| Scala | Play / http4s / ZIO |
| Shell | Bash / POSIX |

---

## Как пользоваться

1. **Новичкам удобно открыть [`README.html`](../../README.html)** в корне репозитория в браузере — обзор, языки и база качества.
2. **Подробный текст — в этом файле** (`README.md`).
3. **Скопируйте `rules/` и `AGENTS.md` в корень продуктового репо**, сохранив относительные пути. Пример:

```
demo/
├── AGENTS.md
├── rules/
│   ├── AGENTS/          # AGENTS.en.md · …（译文）
│   ├── README/          # README-{Tag}.md
│   ├── QualityBaseline/         # QualityBaseline-{Tag}.md
│   └── CodingSpec/
│       ├── CodeConduct/         # CodeConduct-{Tag}.md
│       └── JavaScript&TypeScript/
│           ├── CodingSpec-{Tag}.md
│           ├── DESIGN.md · WebVariable/ · PreView/
│           └── …
├── src/
└── ...
```

В задаче для AI лучше указать:

> Разрабатывайте согласно AGENTS.md.

---

## Структура каталогов

```
OpenVibeCodingRules/
├── AGENTS.md                          # 智能体入口 · 语种路由
├── README.md · README.html            # 说明入口 · 语种切换
├── language/                          # README.html 界面 i18n
├── script/                            # sync / build-md-bundle
├── rules/
│   ├── AGENTS/                        # AGENTS.en.md · zh-TW · ja · ru
│   ├── README/                        # README-{Tag}.md 译文
│   ├── QualityBaseline/               # QualityBaseline-{Tag}.md
│   └── CodingSpec/
│       ├── CodeConduct/               # CodeConduct-{Tag}.md
│       └── <Lang>/
│           ├── CodingSpec-{Tag}.md
│           └── (JS/TS: DESIGN · WebVariable · PreView)
└── LICENSE
```

---

## Быстрый старт

### 1. Подключение к проекту

Скопируйте `AGENTS.md` и `rules/` в корень продукта или используйте Git Submodule и поправьте пути.

### 2. Frontend Token (WebVariable)

Глобальные стили **не копируйте** — только подключайте во входе:

```html
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css" />
```

```typescript
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css'
```

Порядок фиксирован: **ThemeVariable → SystemVariable → ProjectReset → CSS приложения**.

### 3. Включение в Cursor / AI IDE

1. В корне есть `AGENTS.md`
2. У `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md` — `alwaysApply: true`
3. `@` на `CodingSpec.md` языка; для UI — `DESIGN.md` / WebVariable

> Следуйте `AGENTS.md` и `rules/` этого проекта; сначала язык и стек, затем код.

---

## Руководство для разработчиков

### Язык и режим проекта

Определите язык / фреймворк по зависимостям (см. `AGENTS.md` §1). Для frontend также:

| Режим | Как понять | Стек |
|------|------------|------|
| Обычный проект | Нет `public/plugin.json` | Native HTML · Vue · React · Next.js · UniApp |
| Плагин uTools | Есть `public/plugin.json` | Только React · Vue |

### Принципы стилей (frontend · 1:1)

| Тип | Где | Запрещено |
|-----|-----|-----------|
| Глобальные Token | `WebVariable/` | Дублировать в бизнес-компонентах |
| Вёрстка / страница / компонент | В своём модуле | Сваливать стили между модулями, хардкод цветов |

### Тема и размеры

| Нужно | Файл |
|------|------|
| Цвета темы / семантика / текст | `WebVariable/ThemeVariable.css` |
| Отступы, кегль, тени | `WebVariable/SystemVariable.css` |
| Global reset | `WebVariable/ProjectReset.css` (осторожно) |

После правок откройте `PreView/LightDesignSpec.html` или `DarkDesignSpec.html`.

### Свой бренд

**Добавляйте** extension CSS в `WebVariable/` или `Extensions/`, подключайте во входе — **не меняйте** ядро WebVariable.

---

## Для любителей VibeCoding

**✅ Рекомендуется**

- «По `AGENTS.md` сделай список пользователей на Vue 3 со стилями WebVariable»
- «Это FastAPI; реализуй API по `CodingSpec/Python` и комментариям puffseed»
- «Только смени primary в ThemeVariable и проверь PreView»

**❌ Избегать**

- Размытых задач без языка / правил
- Хардкода палитры или копирования Token в компоненты

### Какие спецификации загружать AI

| Тип задачи | Пусть AI читает |
|-----------|-----------------|
| Любой старт | `AGENTS.md` + `CodeConduct.md` |
| Любой продуктовый код | + `QualityBaseline.md` + нужный `CodingSpec.md` |
| Frontend UI | + `DESIGN.md` + WebVariable |

---

## Визуальный превью

| Файл | Описание |
|------|----------|
| `rules/CodingSpec/JavaScript&TypeScript/PreView/LightDesignSpec.html` | Светлая · puffseed-ui |
| `rules/CodingSpec/JavaScript&TypeScript/PreView/DarkDesignSpec.html` | Тёмная · puffseed-ui |

---

## Карта спецификаций

| Файл | Когда смотреть |
|------|----------------|
| `AGENTS.md` | Перед любой AI-задачей |
| `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md` | Границы объёма, без оверинжиниринга |
| `rules/QualityBaseline/QualityBaseline-Zh-CN.md` | Стиль, слои, API, качество, техдолг, сопровождаемость |
| `rules/CodingSpec/<язык>/CodingSpec-Zh-CN.md` | Код на соответствующем языке |
| `.../JavaScript&TypeScript/DESIGN.md` | UI-вёрстка и визуал компонентов |
| `.../WebVariable/*.css` | Цвета, отступы, reset |

**Приоритет**: поведение → `CodeConduct` · качество → `QualityBaseline` · как писать → языковой `CodingSpec` · как выглядит → `DESIGN` + WebVariable.

---

## FAQ

**Q: Можно скопировать WebVariable в `src/styles/`?**  
A: Не рекомендуется. Подключайте во входе — один источник Token.

**Q: Нужен ли WebVariable бэкенду?**  
A: Нет. Достаточно языкового `CodingSpec.md`.

**Q: AI не следует правилам — что делать?**  
A: Явно `@AGENTS.md` и языковой `CodingSpec.md`; напишите «следовать OpenVibeCodingRules / puffseed, минимальный diff».

---

## Лицензия

См. [LICENSE](../../LICENSE).
