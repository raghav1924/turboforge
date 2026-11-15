# TurboForge Plugin & Preset Architecture

How TurboForge synthesizes modular monorepo packages and AI agent presets.

### Architecture Overview
1. **Manifest Synthesis**: Package JSON files are generated dynamically with workspace references.
2. **Turborepo Pipeline Graph**: Tasks (`build`, `lint`, `test`, `dev`) are topologically sorted.
3. **Agent Linkage**: MCP servers in `packages/mcp-server` are configured to communicate over stdio.
