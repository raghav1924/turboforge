# ⚡ turboforge

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/raghav1924/turboforge/actions/workflows/ci.yml/badge.svg)](https://github.com/raghav1924/turboforge/actions)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-emerald.svg)](https://nodejs.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.0-ef4444.svg)](https://turbo.build/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

**Production-grade modern full-stack monorepo generator with AI agent presets and multi-app orchestration.**

[Features](#-key-features) • [Quick Start](#-quick-start) • [Templates](#-architectures) • [Agent Workflows](#-ai-agent--mcp-presets) • [Doctor](#-system-diagnostics)

</div>

---

## 💡 Why Turboforge?

Every engineering team and founder building software in 2026 faces the same initial friction when starting a new project:
- Configuring **Turborepo** workspaces with strict package isolation and cached incremental pipelines.
- Wiring **Next.js 15 (App Router)** + **Tailwind CSS** + **shadcn/ui** to a shared design system without module-resolution issues.
- Setting up a decoupled backend (**NestJS** modular REST API or **Supabase** with typed client and Row Level Security).
- Modernizing workflows for **AI Agents** (pre-configured Model Context Protocol `apps/mcp-server`, Cursor rules, and prompt engineering directives).

**Turboforge** eliminates hours of boilerplate plumbing and generates a battle-tested, type-safe full-stack monorepo in under **2 seconds**.

---

## ✨ Key Features

- 🏎 **Instant Zero-Network Scaffolding:** Offline-first template synthesis engine generates clean, working monorepo trees immediately.
- 🎯 **Decoupled Architecture:** Clean boundary separation between applications (`apps/*`) and shared packages (`packages/*`).
- 🤖 **Agentic & MCP Ready:** Built-in Model Context Protocol server (`apps/mcp-server`), `.agents/RULES.md`, and `.cursorrules` optimized for Cursor, Windsurf, and Claude.
- 🎨 **Shared Design System:** Pre-wired `@repo/ui` package featuring Tailwind-styled buttons, layout primitives, and `cn()` utility tokens.
- 🛡 **Full TypeScript Strictness:** Centralized `@repo/tsconfig` configurations for Next.js, Node.js, and browser libraries.
- 🩺 **Built-in Doctor:** Audits system environment (Node version, Git VCS, and detected package managers).

---

## 🚀 Quick Start

### 1. Global / Direct Execution
\`\`\`bash
# Forge a modern SaaS monorepo
npx turboforge init my-saas-platform

# Or specify custom templates and package managers
npx turboforge init agent-hub --template ai-agent --pm pnpm
\`\`\`

### 2. Enter and Run Your Workspace
\`\`\`bash
cd my-saas-platform
pnpm install
pnpm run dev
\`\`\`

- **Web Application:** `http://localhost:3000`
- **NestJS API Service:** `http://localhost:4000/api`
- **MCP Server:** `apps/mcp-server`

---

## 🏛 Architectures

\`\`\`
turboforge/
├── apps/
│   ├── web/                 # Next.js 15 (App Router, Tailwind CSS, Lucide icons)
│   ├── api/                 # NestJS Modular REST API (with CORS, health check)
│   └── mcp-server/          # Model Context Protocol (MCP) tool integration
└── packages/
    ├── ui/                  # Shared React design system (@repo/ui)
    ├── tsconfig/            # Monorepo TypeScript configurations (@repo/tsconfig)
    └── database/            # Supabase schema, typed client, and RLS policies
\`\`\`

| Template | Frontend | Backend | Database | Agent / MCP |
|---|---|---|---|---|
| `saas` *(Default)* | Next.js 15 App Router | NestJS API | Supabase + RLS | Active |
| `ai-agent` | Next.js Agent Studio UI | Node Orchestrator | Vector Schemas | Dedicated MCP Server |
| `minimal` | Next.js App Router | None | None | Optional |

---

## 🤖 AI Agent & MCP Presets

Turboforge projects come out of the box with strict boundaries that keep AI coding tools disciplined:

- **`.agents/RULES.md`**: Directives for autonomous agents enforcing package boundaries and type safety.
- **`.cursorrules`**: Tailored for Cursor & Windsurf editor agents to prevent cross-workspace module leaks.
- **`apps/mcp-server`**: Model Context Protocol endpoint exposing workspace inspection and repository diagnostic tools to Claude and other LLMs.

---

## 🩺 System Diagnostics

Run the integrated doctor command to verify your local machine environment:

\`\`\`bash
turboforge doctor
\`\`\`

Output:
\`\`\`
🩺 Turboforge System Diagnostics

✔ Node.js Runtime: v22.16.0 (Supported >=18.0.0)
✔ Git VCS: git version 2.50.1
✔ Package Manager [npm]: v10.9.2
✔ Package Manager [pnpm]: v9.14.2

✔ System environment is ready to forge monorepos.
\`\`\`

---

## 🛠 CLI Options & Flags

\`\`\`bash
turboforge <command> [project-name] [options]

Commands:
  init, create <name>      Forge a new monorepo in a target folder
  templates                List available monorepo architectures
  doctor                   Run system environment diagnostics
  help                     Show CLI usage and examples

Flags:
  --template <type>        'saas' | 'ai-agent' | 'minimal' (default: 'saas')
  --backend <type>         'nestjs' | 'fastify' | 'none' (default: 'nestjs')
  --database <type>        'supabase' | 'postgresql' | 'none' (default: 'supabase')
  --pm <manager>           'pnpm' | 'npm' | 'yarn' | 'bun' (default: 'pnpm')
  --no-mcp                 Skip MCP server stub
  --no-agents              Skip agent rules and cursor configuration
  --no-git                 Skip git repository initialization
\`\`\`

---

## 👨‍💻 Author & Open Source

Created with ❤️ by **[Jatin Sharma](https://jatinsh.netlify.app/)**  
*Full-Stack Engineer & Product Designer*

- 🌐 **Portfolio & Case Studies:** [https://jatinsh.netlify.app/](https://jatinsh.netlify.app/)
- 🐙 **GitHub:** [@raghav1924](https://github.com/raghav1924)
- 📦 **Repository:** [https://github.com/raghav1924/turboforge](https://github.com/raghav1924/turboforge)

Distributed under the [MIT License](LICENSE).

