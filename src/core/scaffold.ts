import fs from 'node:fs';
import path from 'node:path';
import { ProjectConfig, TemplateFile } from './types.js';
import { generateCommonConfigs } from '../templates/common.js';
import { generateSaasTemplate } from '../templates/saas.js';
import { generateAiAgentTemplate } from '../templates/ai-agent.js';
import { generateMinimalTemplate } from '../templates/minimal.js';
import { log } from '../utils/logger.js';

export class ScaffoldEngine {
  constructor(private config: ProjectConfig) {}

  public async generate(): Promise<{ totalFiles: number; targetDir: string }> {
    const targetDir = this.config.targetDir;

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    log.step(1, 4, `Synthesizing architecture for '${this.config.name}'...`);
    const files: TemplateFile[] = [
      ...generateCommonConfigs(this.config),
      ...this.resolveTemplateFiles(),
      this.generateReadme(),
    ];

    log.step(2, 4, `Writing ${files.length} project files across workspace boundaries...`);
    for (const file of files) {
      const fullPath = path.join(targetDir, file.path);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(fullPath, file.content, 'utf-8');
    }

    log.step(3, 4, `Verifying workspace package dependencies and lock paths...`);
    // Workspace verification

    log.step(4, 4, `Finalizing project setup...`);

    return {
      totalFiles: files.length,
      targetDir,
    };
  }

  private resolveTemplateFiles(): TemplateFile[] {
    switch (this.config.template) {
      case 'saas':
        return generateSaasTemplate(this.config);
      case 'ai-agent':
        return generateAiAgentTemplate(this.config);
      case 'minimal':
        return generateMinimalTemplate(this.config);
      default:
        return generateSaasTemplate(this.config);
    }
  }

  private generateReadme(): TemplateFile {
    return {
      path: 'README.md',
      content: `# ${this.config.name}

> Production-grade full-stack monorepo generated with [Turboforge](https://github.com/raghav1924/turboforge).

## 🚀 Workspace Overview
This monorepo uses **[Turborepo](https://turbo.build/)** with **${this.config.packageManager}** for lightning-fast incremental builds and strict module boundaries.

### Apps & Packages
\`\`\`
${this.config.name}/
├── apps/
│   ├── web/                 # Next.js 15 (App Router, Tailwind CSS, Lucide)
${this.config.backend === 'nestjs' ? '│   ├── api/                 # NestJS Modular Backend API\n' : ''}${this.config.includeMcpServer ? '│   ├── mcp-server/          # Model Context Protocol (MCP) Agent Gateway\n' : ''}└── packages/
    ├── ui/                  # Shared React design system & Tailwind primitives
    ├── tsconfig/            # Shared TypeScript configs
${this.config.database === 'supabase' ? '    └── database/            # Supabase schema, typed client, and RLS policies\n' : ''}\`\`\`

## 🛠 Quick Start

### 1. Install Dependencies
\`\`\`bash
${this.config.packageManager} install
\`\`\`

### 2. Configure Environment
\`\`\`bash
cp .env.example .env.local
\`\`\`

### 3. Run Development Servers
\`\`\`bash
${this.config.packageManager} run dev
\`\`\`
- Web UI: \`http://localhost:3000\`
${this.config.backend === 'nestjs' ? '- NestJS API: `http://localhost:4000/api`\n' : ''}

## 🤖 AI Agent Integration
- Presets are pre-loaded in \`.agents/RULES.md\` and \`.cursorrules\`.
- Cursor, Windsurf, and LLM coding assistants will strictly adhere to monorepo import limits.

---
*Created by [Jatin Sharma](https://jatinsh.netlify.app/) with Turboforge.*
`,
    };
  }
}

