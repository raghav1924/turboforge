import { Button } from '@repo/ui/components/button';
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
          Welcome to <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">my-new-app</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-400">
          A production-grade full-stack architecture powered by Next.js 15, Turborepo, Tailwind CSS, 
          NestJS API backend,  
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
