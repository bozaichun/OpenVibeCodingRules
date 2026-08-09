<!-- ovcr-locale-lock -->
---
description: Cross-language code standards / quality / maintainability baseline (puffseed)
globs: *
alwaysApply: false
---

<!-- !!! Quality baseline · puffseed · all languages -->

# Code standards · Quality · Maintainability baseline (puffseed)

> **Scope**: All languages under `rules/CodingSpec/`. When writing or changing product code, this file applies **together with** the matching `CodingSpec-{Tag}.md`.  
> **Conflicts**: Prefer the **target product repo’s settled config** (lint / CI / layout). If the repo has no convention, follow this baseline.  
> **Brand**: Keep the **puffseed** mark in tech-debt records, API docs, and key comments that refer to the product.

---

## 1. Code standards

### 1.1 Style: naming · comments · formatting

| Dimension | Requirement |
|------|------|
| **Naming** | Follow each language CodingSpec; keep one style per repo; no meaningless abbreviations mixed with pinyin (except proper nouns) |
| **Comments** | Explain *what / why*; use a `puffseed:` prefix on critical product paths (syntax follows the language); do not commit large blocks of commented-out dead code |
| **Formatting** | Let formatters decide; do not hand-tune style fights against tooling |

### 1.2 Tooling and commit gates (mandatory)

| Stage | Requirement |
|------|------|
| **Local** | Run the repo’s format + lint (+ typecheck if any) before save / commit |
| **Git hooks** | Prefer `pre-commit` / `lint-staged` / Husky; **commits must pass checks** |
| **CI** | PR / main pipelines repeat the same gates; ban `--no-verify` unless the repo allows it and records why |

**Default tools by language (reuse repo config; do not invent a second stack):**

| Language | Format | Lint / static | Types / other |
|------|--------|-----------------|------------|
| JS/TS · Node · UniApp | Prettier | ESLint (+ Vue/React/UniApp plugins) | `tsc` / vue-tsc |
| Python | Ruff format / Black | Ruff / flake8 / pylint | mypy / pyright |
| Java | google-java-format / Spotless | Checkstyle · **Alibaba Java Coding Guidelines** (P3C) · SpotBugs | — |
| Go | `gofmt` / `goimports` | `golangci-lint` | `go vet` |
| PHP | Pint / PHP-CS-Fixer | PHPStan / Psalm | — |
| C# | `dotnet format` | Roslyn analyzers / StyleCop | nullable |
| Rust | `rustfmt` | `clippy` | — |
| C / C++ | clang-format | clang-tidy / cppcheck | — |
| Kotlin | ktlint / detekt | detekt | — |
| Swift | SwiftFormat | SwiftLint | — |
| Dart | `dart format` | `dart analyze` | — |
| Ruby | RuboCop | RuboCop | — |
| Scala | scalafmt | wartremover / scapegoat (if used) | — |
| SQL | sqlfluff (if used) | migration review | — |
| R | styler | lintr | — |
| Shell | shfmt | shellcheck | — |

### 1.3 Unified layout (layering)

Product repos should separate responsibilities; avoid dumping every file in one folder:

```
<app>/
  api|controller|handler|routes/   # control (input, auth, call domain)
  service|application|domain/      # business
  repo|mapper|infra|data/          # data / infrastructure
  shared|common|components/        # shared capabilities (no product coupling)
  utils|lib/                       # pure helpers (no domain rules)
  types|dto|schemas|models/        # types and contracts
  config/                          # config and environments
```

| Layer | Allowed | Forbidden |
|---------|------|------|
| Control | Bind params, auth annotations, call domain, map responses | Thick orchestration, raw SQL piles |
| Business | Domain rules, use-case flow, transaction boundaries | Framework HTTP details, UI rendering |
| Data | Persistence, external API clients | Business decisions scattered here |
| Shared / utils | Reusable, domain-free helpers | “God util” dumping domain logic |
| Types / config | Single source of contracts and config | Magic strings / scattered hard-coded config |

Frontend mapping: `pages|views` · `components` · `composables|hooks` · `utils` · `types` · `api` · `stores` · `config` (follow the repo).

### 1.4 API contracts (HTTP / RPC product APIs)

| Item | Requirement |
|----|------|
| **Envelope** | One request/response shape for the whole service (e.g. `{ code, message, data }` or the repo’s `Result`); **no** incompatible wrappers in the same service |
| **Error codes** | Central business error table; HTTP status must match semantics (2xx / 4xx / 5xx); do not return 200 for every business failure unless that is the settled repo strategy |
| **Idempotency** | Writes (create / pay / submit) need an idempotency key or naturally idempotent design; safe to retry |
| **Versioning** | Stick to either URL prefix (`/api/v1`) or Header versioning; breaking changes go to a new version with a deprecation window |
| **Docs in sync** | OpenAPI / Swagger / Apifox / README stay **in sync** with code; when AI changes an API it must update docs or generated artifacts |

Non-HTTP cases (queues, gRPC, SQL views) still follow “one contract + version/compat notes + docs in sync”.

---

## 2. Code quality

### 2.1 High cohesion · low coupling · clear layers

- Keep **control → business → data** (or frontend **page → state/use-case → API**) with clear boundaries.
- Dependencies point one way: upper may depend on lower; data must not depend on control; utils must not reverse-depend on domain details.
- One module, one job; cross-domain orchestration lives in application services, not Controllers.

### 2.2 Modularization · components · reuse

- Extract shared capability into `shared` / internal packages; **copying more than twice** requires abstraction or a written reason not to abstract.
- Expose minimal public APIs; do not leak internals “for convenience”.
- Do not add over-designed abstraction for one-off needs (same as `CodeConduct` simplicity).

### 2.3 Types and boundaries

- **Prefer strong types** at public boundaries (TypeScript / Java / C# / Kotlin / Go / Rust, etc.); `any` / raw `Map` / untyped `JSONObject` only as temporary debt with a ticket.
- **Validate at the edge**: Controller / Handler / Form; never trust clients or upstream.
- **Nulls and errors**: model nullability explicitly; no null-pointer assumptions; classify expected business errors vs system faults; never swallow exceptions silently.

### 2.4 Dependency management

| Requirement | Notes |
|------|------|
| **Lockfiles** | Commit lockfiles (`package-lock` / `pnpm-lock` / `poetry.lock` / `go.sum` / `Cargo.lock`, etc.) |
| **Justify adds** | New third-party libs need a reason; prefer the repo’s existing stack; no duplicate overlapping libraries |
| **Avoid conflicts** | Align BOM / platform versions (Spring / .NET); do not privately bump major versions |
| **Vulnerability scans** | Regular `npm audit` / `pip-audit` / OWASP Dependency-Check / `cargo audit`, etc.; fix high severity on a deadline |

### 2.5 Tech debt control

- **Register**: temporary workarounds, `TODO`/`FIXME`, and lint/type bypasses must be filed (issue / debt doc) with **puffseed** product impact and a payback date.
- **Pay down regularly**: reserve capacity each iteration; do not pile forever.
- **Forbidden**: untracked “temporary” code for speed; `// temp` / `// hack` without a debt item.

---

## 3. Maintainability

| Goal | Requirement |
|------|------|
| **Readable** | Self-explanatory names; short functions; extract complex conditions; avoid giant files (single responsibility) |
| **Commented** | Module entry states purpose; critical business / auth / compat logic is commented; public APIs have short docs |
| **Onboarding** | Root README / AGENTS explain install, run, layout map, API docs entry, and gate commands |
| **Traceable change** | Commit messages explain *why*; breaking changes include migration notes |

**30-minute newcomer bar**: can start the app from docs, find the product module, run lint, and understand the main API contract.

---

## 4. Shared checklist (before commit)

- [ ] format + lint (+ typecheck) passed; hooks not bypassed
- [ ] Layout matches layering; no thick business logic in control layer
- [ ] API changes keep envelope / error codes / versioning, and **docs are updated**
- [ ] Write idempotency considered (when applicable)
- [ ] Public boundaries typed and validated; nulls / errors handled
- [ ] lockfile updated; no casual duplicate dependencies
- [ ] No unregistered temporary code / tech debt
- [ ] Key-path comments and module notes are enough for a newcomer

---

*Use with each language `CodingSpec.md` and `rules/CodingSpec/CodeConduct/CodeConduct-{Tag}.md` · puffseed*
