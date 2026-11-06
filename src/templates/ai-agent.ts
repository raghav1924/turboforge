import { ProjectConfig, TemplateFile } from '../core/types.js';

export function generateAiAgentTemplate(config: ProjectConfig): TemplateFile[] {
  const files: TemplateFile[] = [];

  // Next.js Agent Studio UI in apps/web
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
        },
        dependencies: {
          next: '^15.0.3',
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          '@repo/ui': 'workspace:*',
          'lucide-react': '^0.460.0',
        },
        devDependencies: {
          '@repo/tsconfig': 'workspace:*',
          '@types/node': '^22.10.1',
          '@types/react': '^19.0.0',
          '@types/react-dom': '^19.0.0',
          tailwindcss: '^3.4.15',
          typescript: '^5.5.4',
        },
      },
      null,
      2
    ) + '\n',
  });

  files.push({
    path: 'apps/web/src/app/page.tsx',
    content: `import { Bot, Terminal, Cpu, Play } from 'lucide-react';
import { Button } from '@repo/ui/components/button';

export default function AgentStudioPage() {
  return (
    <main className="min-h-screen bg-black text-neutral-100 flex flex-col p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between border-b border-neutral-800 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">${config.name} Agent Studio</h1>
            <p className="text-xs text-neutral-400">Autonomous Agent Orchestration & MCP Gateway</p>
          </div>
        </div>
        <Button variant="primary" size="sm" className="gap-2">
          <Play className="w-3.5 h-3.5" /> Run Agent Task
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        <div className="md:col-span-2 border border-neutral-800 rounded-xl bg-neutral-900/30 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold flex items-center gap-2 text-neutral-300">
              <Terminal className="w-4 h-4 text-cyan-400" /> Live Execution Stream
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
          </div>
          <div className="flex-1 bg-black/50 border border-neutral-800/80 rounded-lg p-4 font-mono text-xs text-neutral-400 overflow-y-auto space-y-2">
            <p className="text-neutral-500">// Connected to local MCP runtime port 4000</p>
            <p className="text-cyan-400">› System prompt injected: .agents/RULES.md</p>
            <p className="text-emerald-400">✔ Ready to dispatch autonomous tasks.</p>
          </div>
        </div>

        <div className="border border-neutral-800 rounded-xl bg-neutral-900/30 p-6">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-4 text-neutral-300">
            <Cpu className="w-4 h-4 text-indigo-400" /> Registered MCP Tools
          </h2>
          <ul className="space-y-3 text-xs text-neutral-400">
            <li className="p-3 border border-neutral-800 rounded-lg bg-neutral-950">
              <strong className="text-neutral-200 block">inspect_workspace</strong>
              <span>Scans repository health & package boundaries</span>
            </li>
            <li className="p-3 border border-neutral-800 rounded-lg bg-neutral-950">
              <strong className="text-neutral-200 block">vector_search</strong>
              <span>Retrieves semantic codebase embeddings</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
`,
  });

  return files;
}
