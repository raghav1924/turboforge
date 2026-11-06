# my-new-app

> Production-grade full-stack monorepo generated with [Turboforge](https://github.com/raghav1924/turboforge).

## 🚀 Workspace Overview
This monorepo uses **[Turborepo](https://turbo.build/)** with **pnpm** for lightning-fast incremental builds and strict module boundaries.

### Apps & Packages
```
my-new-app/
├── apps/
│   ├── web/                 # Next.js 15 (App Router, Tailwind CSS, Lucide)
│   ├── api/                 # NestJS Modular Backend API
│   ├── mcp-server/          # Model Context Protocol (MCP) Agent Gateway
└── packages/
    ├── ui/                  # Shared React design system & Tailwind primitives
    ├── tsconfig/            # Shared TypeScript configs
    └── database/            # Supabase schema, typed client, and RLS policies
```

## 🛠 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

### 3. Run Development Servers
```bash
pnpm run dev
```
- Web UI: `http://localhost:3000`
- NestJS API: `http://localhost:4000/api`


## 🤖 AI Agent Integration
- Presets are pre-loaded in `.agents/RULES.md` and `.cursorrules`.
- Cursor, Windsurf, and LLM coding assistants will strictly adhere to monorepo import limits.

---
*Created by [Jatin Sharma](https://jatinsh.netlify.app/) with Turboforge.*
