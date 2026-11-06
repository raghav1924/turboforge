import { ProjectConfig, TemplateFile } from '../core/types.js';

export function generateCommonConfigs(config: ProjectConfig): TemplateFile[] {
  const files: TemplateFile[] = [];

  // Root package.json
  files.push({
    path: 'package.json',
    content: JSON.stringify(
      {
        name: config.name,
        private: true,
        scripts: {
          build: 'turbo run build',
          dev: 'turbo run dev',
          lint: 'turbo run lint',
          format: 'prettier --write "**/*.{ts,tsx,md}"',
          test: 'turbo run test',
          clean: 'turbo run clean && rm -rf node_modules',
        },
        devDependencies: {
          turbo: '^2.0.0',
          prettier: '^3.3.3',
          typescript: '^5.5.4',
        },
        packageManager: `${config.packageManager}@9.0.0`,
        engines: {
          node: '>=18.0.0',
        },
      },
      null,
      2
    ) + '\n',
  });

  // turbo.json
  files.push({
    path: 'turbo.json',
    content: JSON.stringify(
      {
        $schema: 'https://turbo.build/schema.json',
        ui: 'tui',
        tasks: {
          build: {
            dependsOn: ['^build'],
            inputs: ['$TURBO_DEFAULT$', '.env*'],
            outputs: ['.next/**', '!.next/cache/**', 'dist/**'],
          },
          lint: {
            dependsOn: ['^lint'],
          },
          test: {
            dependsOn: ['^test'],
          },
          dev: {
            cache: false,
            persistent: true,
          },
          clean: {
            cache: false,
          },
        },
      },
      null,
      2
    ) + '\n',
  });

  // pnpm-workspace.yaml
  files.push({
    path: 'pnpm-workspace.yaml',
    content: `packages:\n  - "apps/*"\n  - "packages/*"\n`,
  });

  // .gitignore
  files.push({
    path: '.gitignore',
    content: `# Dependencies
node_modules
.pnpm-store

# Next.js
.next/
out/

# Production build outputs
dist/
build/

# Turborepo cache
.turbo

# Environment variables
.env
.env.local
.env.production
!.env.example

# Debug and system logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.DS_Store
*.pem
`,
  });

  // .env.example
  files.push({
    path: '.env.example',
    content: `# ==============================================
# Environment Configuration for ${config.name}
# ==============================================

NODE_ENV=development
PORT=3000
API_PORT=4000

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Database / Supabase
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/${config.name}
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# AI / MCP Gateway Credentials
OPENAI_API_KEY=sk-placeholder
ANTHROPIC_API_KEY=sk-placeholder
MCP_SERVER_SECRET=your-mcp-secret-token-here
`,
  });

  // Packages: @repo/tsconfig
  files.push({
    path: 'packages/tsconfig/package.json',
    content: JSON.stringify(
      {
        name: '@repo/tsconfig',
        version: '0.0.0',
        private: true,
        files: ['base.json', 'nextjs.json', 'node.json'],
      },
      null,
      2
    ) + '\n',
  });

  files.push({
    path: 'packages/tsconfig/base.json',
    content: JSON.stringify(
      {
        $schema: 'https://json.schemastore.org/tsconfig',
        compilerOptions: {
          target: 'ES2022',
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          declaration: true,
          declarationMap: true,
        },
      },
      null,
      2
    ) + '\n',
  });

  files.push({
    path: 'packages/tsconfig/nextjs.json',
    content: JSON.stringify(
      {
        $schema: 'https://json.schemastore.org/tsconfig',
        extends: './base.json',
        compilerOptions: {
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          jsx: 'preserve',
          noEmit: true,
          incremental: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          plugins: [{ name: 'next' }],
        },
      },
      null,
      2
    ) + '\n',
  });

  // Packages: @repo/ui
  files.push({
    path: 'packages/ui/package.json',
    content: JSON.stringify(
      {
        name: '@repo/ui',
        version: '0.0.0',
        private: true,
        exports: {
          './components/*': './src/components/*.tsx',
          './lib/*': './src/lib/*.ts',
          './styles.css': './src/styles.css',
        },
        scripts: {
          lint: 'eslint .',
        },
        peerDependencies: {
          react: '^18.3.0 || ^19.0.0',
          'react-dom': '^18.3.0 || ^19.0.0',
        },
        devDependencies: {
          '@repo/tsconfig': 'workspace:*',
          typescript: '^5.5.4',
          clsx: '^2.1.1',
          'tailwind-merge': '^2.5.2',
        },
      },
      null,
      2
    ) + '\n',
  });

  files.push({
    path: 'packages/ui/src/lib/utils.ts',
    content: `export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
`,
  });

  files.push({
    path: 'packages/ui/src/components/button.tsx',
    content: `import * as React from 'react';
import { cn } from '../lib/utils.js';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg';
    const variants = {
      primary: 'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100',
      secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700',
      outline: 'border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100',
      ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
    };
    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
`,
  });

  // Agents & Rules presets
  if (config.includeAgentsRules) {
    files.push({
      path: '.agents/RULES.md',
      content: `# AI Agent Rules & Architecture Guidelines

Project: **${config.name}**
Generated by Turboforge Monorepo Generator.

## Core Rules for Coding Agents
1. **Strict Monorepo Boundaries:** Never import relative files across workspace packages. Always use package namespace \`@repo/*\`.
2. **Type Safety:** No implicit \`any\`. Add shared types in \`packages/database\` or \`packages/ui\` when shared between \`apps/web\` and \`apps/api\`.
3. **App Router Standards:** All pages in \`apps/web/app\` are React Server Components by default. Add \`'use client'\` only when interacting with browser state or events.
4. **Design Tokens:** Strictly adhere to Tailwind colors, font families, and radius tokens defined in \`packages/ui\`.
`,
    });

    files.push({
      path: '.cursorrules',
      content: `# Cursor & Agent Rules for ${config.name}
- Prefer server actions and React Server Components for mutations.
- Keep dependencies lean and reuse @repo/ui buttons and primitives.
- If editing database schemas, document migration impact in packages/database/README.md.
- Ensure all API endpoints in apps/api include DTO validation and status code documentation.
`,
    });
  }

  // MCP Server preset if requested
  if (config.includeMcpServer) {
    files.push({
      path: 'apps/mcp-server/package.json',
      content: JSON.stringify(
        {
          name: `${config.name}-mcp`,
          version: '0.1.0',
          private: true,
          main: 'dist/index.js',
          scripts: {
            build: 'tsc',
            dev: 'node --watch src/index.js',
            start: 'node dist/index.js',
          },
          dependencies: {
            '@modelcontextprotocol/sdk': '^1.0.0',
          },
          devDependencies: {
            '@repo/tsconfig': 'workspace:*',
            typescript: '^5.5.4',
          },
        },
        null,
        2
      ) + '\n',
    });

    files.push({
      path: 'apps/mcp-server/src/index.ts',
      content: `/**
 * Model Context Protocol (MCP) Server for ${config.name}
 * Provides contextual tools for Claude, Windsurf, and AI Agents
 */

console.log('🤖 [${config.name}-mcp] Initializing MCP Server...');

export interface AgentTool {
  name: string;
  description: string;
  execute: (params: Record<string, unknown>) => Promise<unknown>;
}

export const tools: AgentTool[] = [
  {
    name: 'inspect_workspace',
    description: 'Returns health, routes, and active packages in the ${config.name} monorepo',
    execute: async () => ({
      status: 'healthy',
      apps: ['web', '${config.backend === 'nestjs' ? 'api' : 'orchestrator'}'],
      packages: ['ui', 'tsconfig'],
    }),
  },
];
`,
    });
  }

  return files;
}

