import { ProjectConfig, TemplateFile } from '../core/types.js';

export function generateSaasTemplate(config: ProjectConfig): TemplateFile[] {
  const files: TemplateFile[] = [];

  // 1. Next.js App in apps/web
  files.push({
    path: 'apps/web/package.json',
    content: JSON.stringify(
      {
        name: 'web',
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'next dev --port 3000',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
        },
        dependencies: {
          next: '^15.0.3',
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          '@repo/ui': 'workspace:*',
          'lucide-react': '^0.460.0',
          clsx: '^2.1.1',
          'tailwind-merge': '^2.5.4',
        },
        devDependencies: {
          '@repo/tsconfig': 'workspace:*',
          '@types/node': '^22.10.1',
          '@types/react': '^19.0.0',
          '@types/react-dom': '^19.0.0',
          autoprefixer: '^10.4.20',
          postcss: '^8.4.49',
          tailwindcss: '^3.4.15',
          typescript: '^5.5.4',
        },
      },
      null,
      2
    ) + '\n',
  });

  files.push({
    path: 'apps/web/tsconfig.json',
    content: JSON.stringify(
      {
        extends: '@repo/tsconfig/nextjs.json',
        compilerOptions: {
          paths: {
            '@/*': ['./src/*'],
          },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules'],
      },
      null,
      2
    ) + '\n',
  });

  files.push({
    path: 'apps/web/next.config.mjs',
    content: `/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  reactStrictMode: true,
};

export default nextConfig;
`,
  });

  files.push({
    path: 'apps/web/tailwind.config.ts',
    content: `import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
  },
  plugins: [],
};
export default config;
`,
  });

  files.push({
    path: 'apps/web/postcss.config.mjs',
    content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,
  });

  files.push({
    path: 'apps/web/src/app/globals.css',
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --border: 240 5.9% 90%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 5%;
    --card-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
  }
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-feature-settings: "rlig" 1, "calt" 1;
}
`,
  });

  files.push({
    path: 'apps/web/src/app/layout.tsx',
    content: `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '${config.name} — Modern SaaS',
  description: 'Built with Turboforge Full-Stack Monorepo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
`,
  });

  files.push({
    path: 'apps/web/src/app/page.tsx',
    content: `import { Button } from '@repo/ui/components/button';
import { ArrowRight, Layers, ShieldCheck, Zap, Bot, Terminal } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-6 py-24 overflow-hidden bg-neutral-950 text-neutral-100">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="z-10 max-w-4xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md text-xs font-medium text-cyan-400">
          <Zap className="w-3.5 h-3.5" />
          <span>Turboforge Monorepo Ready</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Welcome to <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">${config.name}</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-400">
          A production-grade full-stack architecture powered by Next.js 15, Turborepo, Tailwind CSS, 
          ${config.backend === 'nestjs' ? 'NestJS API backend, ' : 'modular API services, '} 
          and integrated AI agent workflows.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button variant="primary" size="lg" className="gap-2">
            Explore Dashboard <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Terminal className="w-4 h-4" /> View Docs
          </Button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-16 text-left">
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors">
            <Layers className="w-6 h-6 text-cyan-400 mb-3" />
            <h3 className="font-semibold text-neutral-200">Shared Design System</h3>
            <p className="text-sm text-neutral-400 mt-1">Pre-wired with @repo/ui buttons, utilities, and Tailwind design tokens.</p>
          </div>
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-semibold text-neutral-200">Type-Safe Boundary</h3>
            <p className="text-sm text-neutral-400 mt-1">Strict TypeScript path mappings and turbo-cached incremental builds.</p>
          </div>
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors">
            <Bot className="w-6 h-6 text-indigo-400 mb-3" />
            <h3 className="font-semibold text-neutral-200">Agentic MCP Workflows</h3>
            <p className="text-sm text-neutral-400 mt-1">Ready for Cursor, Claude, and autonomous background coding tasks.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
`,
  });

  // 2. Backend API in apps/api (NestJS or Node REST)
  if (config.backend === 'nestjs') {
    files.push({
      path: 'apps/api/package.json',
      content: JSON.stringify(
        {
          name: 'api',
          version: '0.1.0',
          private: true,
          scripts: {
            build: 'nest build',
            start: 'nest start',
            dev: 'nest start --watch',
            lint: 'eslint "{src,apps,libs,test}/**/*.ts"',
            test: 'jest',
          },
          dependencies: {
            '@nestjs/common': '^10.4.8',
            '@nestjs/core': '^10.4.8',
            '@nestjs/platform-express': '^10.4.8',
            'reflect-metadata': '^0.2.2',
            rxjs: '^7.8.1',
          },
          devDependencies: {
            '@nestjs/cli': '^10.4.8',
            '@nestjs/schematics': '^10.2.3',
            '@repo/tsconfig': 'workspace:*',
            '@types/express': '^5.0.0',
            '@types/node': '^22.10.1',
            typescript: '^5.5.4',
          },
        },
        null,
        2
      ) + '\n',
    });

    files.push({
      path: 'apps/api/tsconfig.json',
      content: JSON.stringify(
        {
          extends: '@repo/tsconfig/node.json',
          compilerOptions: {
            outDir: './dist',
            baseUrl: './',
          },
          include: ['src/**/*'],
        },
        null,
        2
      ) + '\n',
    });

    files.push({
      path: 'apps/api/src/main.ts',
      content: `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  
  const port = process.env.API_PORT || 4000;
  await app.listen(port);
  console.log(\`🚀 [API] Running on: http://localhost:\${port}/api\`);
}
bootstrap();
`,
    });

    files.push({
      path: 'apps/api/src/app.module.ts',
      content: `import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
`,
    });

    files.push({
      path: 'apps/api/src/app.controller.ts',
      content: `import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth() {
    return this.appService.getHealthStatus();
  }
}
`,
    });

    files.push({
      path: 'apps/api/src/app.service.ts',
      content: `import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'NestJS Backend API',
      version: '1.0.0',
    };
  }
}
`,
    });
  }

  // 3. Database Schema package
  if (config.database === 'supabase') {
    files.push({
      path: 'packages/database/package.json',
      content: JSON.stringify(
        {
          name: '@repo/database',
          version: '0.0.0',
          private: true,
          main: './src/index.ts',
          dependencies: {
            '@supabase/supabase-js': '^2.46.2',
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
      path: 'packages/database/src/index.ts',
      content: `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'member';
  created_at: string;
}
`,
    });

    files.push({
      path: 'packages/database/schema.sql',
      content: `-- Supabase PostgreSQL Schema for ${config.name}
-- Run this in your Supabase SQL Editor

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text default 'member' check (role in ('admin', 'member')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);
`,
    });
  }

  return files;
}

