# TurboForge CLI Reference Guide

Comprehensive flag and option specification for the TurboForge CLI generator.

### Commands

#### `turboforge init [project-name]`
Initializes a new full-stack monorepo with chosen stack presets.

- `--template <type>`: Select template (`saas`, `ai-agent`, `minimal`). Default: `saas`.
- `--package-manager <pm>`: Package manager (`pnpm`, `npm`, `yarn`). Default: `pnpm`.
- `--with-mcp`: Include Model Context Protocol agent configuration scaffolding.
- `--skip-install`: Skip automatic dependency installation.

#### `turboforge doctor`
Diagnoses workspace configuration, Turborepo pipeline boundaries, and missing environment variables.
