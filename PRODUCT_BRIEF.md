# Turboforge: Product Engineering Brief

**Project Name:** `turboforge` (cli: `turboforge`)  
**Tagline:** Production-grade modern full-stack monorepo generator with AI agent presets and multi-app orchestration.  
**Created Date:** 2026-11-06  
**Author:** Jatin Sharma ([https://jatinsh.netlify.app/](https://jatinsh.netlify.app/))  
**Status:** In Development

---

## 1. The Real-World Problem
Every time an engineer, founder, or team starts a modern full-stack product in 2026, they face the exact same cognitive drag and repetitive plumbing:
- Setting up a Turborepo / pnpm workspace correctly with TypeScript path aliases and strict package boundaries.
- Connecting Next.js 15 (App Router) + Tailwind CSS + Lucide + shadcn-ready primitives to a shared UI package without bundling errors or peer-dependency hell.
- Deciding between/scaffolding a backend: modular NestJS REST/GraphQL API or edge Supabase client with typed schema stubs.
- Pre-configuring modern AI Agent presets: Model Context Protocol (MCP) server stubs, prompt engineering directories (`.agents/`), Cursor/Windsurf rules (`.cursorrules`), and deterministic evaluation hooks.
- Configuring shared ESLint 9 (flat config), Prettier, GitHub Actions CI matrix, and Dockerfiles.

Standard `create-turbo` provides only minimal skeleton templates with no real backend choices, no design-system setup, no Supabase schema presets, and zero agentic/MCP workflows.

## 2. Product Solution: Turboforge
Turboforge is a modern, high-speed CLI tool built with TypeScript that scaffolds opinionated, production-ready full-stack monorepos in seconds.

### Core Capabilities:
1. **Interactive Prompt Engine** (Commander + Prompts/Inquirer) or zero-friction flags (`--template`, `--backend`, `--auth`, `--agents`, `--git`).
2. **Preset Templates:**
   - `saas`: Next.js 15 App Router + Tailwind + shadcn UI + NestJS API + PostgreSQL/Supabase + Auth + Agent MCP server.
   - `ai-agent`: Next.js Web Studio + Fastify/Node Agent orchestrator + MCP Tool registry + Vector store schema + LangChain/Vercel AI SDK stubs.
   - `minimal`: Next.js frontend + Shared UI package + Shared tsconfig/eslint.
3. **Smart Code Generator:**
   - Renders cleanly decoupled workspaces (`apps/web`, `apps/api`, `packages/ui`, `packages/config`, `packages/database`).
   - Generates working, runnable code with zero syntax errors, type errors, or broken imports.
   - Injects `.agents/RULES.md`, `.cursorrules`, and MCP server starter configurations.
4. **Instant Validation & Doctor:**
   - `turboforge doctor` checks local Node/pnpm/git environments and validates turbo pipeline health.
   - `turboforge list-templates` previews architecture diagrams in terminal.

---

## 3. Architecture & Tech Stack
- **Language:** TypeScript
- **Runtime:** Node.js (>=18.0.0)
- **CLI Framework:** `commander` + `picocolors` + `prompts` + `ora`
- **Scaffolding Engine:** Programmatic virtual file tree generator + template synthesizer (no external network fetches required to run local templates).
- **Target Monorepo Output:**
  - Monorepo Orchestration: Turborepo (`turbo.json`)
  - Web: Next.js (App Router, Tailwind CSS, Lucide icons, responsive dashboard layout)
  - Backend options: NestJS / Node REST API / Supabase
  - Shared: `@repo/ui`, `@repo/tsconfig`, `@repo/eslint-config`
  - Agentic: `.agents/`, `.cursorrules`, `apps/mcp-server`

