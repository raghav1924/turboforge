import path from 'node:path';
import { banner, log, colors } from './utils/logger.js';
import { ProjectConfig, TemplateType, BackendType, DatabaseType, PackageManager } from './core/types.js';
import { ScaffoldEngine } from './core/scaffold.js';
import { runDoctor } from './core/doctor.js';

export function runCli(argv: string[]): void {
  banner();

  const args = argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h' || command === 'help') {
    printHelp();
    return;
  }

  if (command === 'doctor') {
    runDoctor();
    return;
  }

  if (command === 'list-templates' || command === 'templates') {
    printTemplates();
    return;
  }

  if (command === 'init' || command === 'create') {
    const projectName = args[1] || 'my-turboforge-app';
    const parsedOptions = parseFlags(args.slice(2));

    const config: ProjectConfig = {
      name: projectName,
      targetDir: path.resolve(process.cwd(), projectName),
      template: parsedOptions.template || 'saas',
      backend: parsedOptions.backend || 'nestjs',
      database: parsedOptions.database || 'supabase',
      includeMcpServer: parsedOptions.includeMcpServer ?? true,
      includeAgentsRules: parsedOptions.includeAgentsRules ?? true,
      packageManager: parsedOptions.packageManager || 'pnpm',
      gitInit: parsedOptions.gitInit ?? true,
    };

    console.log(`${colors.cyan}Forging new full-stack monorepo:${colors.reset} ${colors.bold}${config.name}${colors.reset}`);
    console.log(`${colors.gray}├─ Template:  ${config.template}`);
    console.log(`├─ Backend:   ${config.backend}`);
    console.log(`├─ Database:  ${config.database}`);
    console.log(`├─ AI Agents: ${config.includeAgentsRules ? 'Active (.agents/ + .cursorrules)' : 'None'}`);
    console.log(`├─ MCP Tools: ${config.includeMcpServer ? 'Active (apps/mcp-server)' : 'None'}`);
    console.log(`└─ Target:    ${config.targetDir}${colors.reset}\n`);

    const engine = new ScaffoldEngine(config);
    engine.generate()
      .then(({ totalFiles, targetDir }) => {
        console.log(`\n${colors.bold}${colors.green}✔ Monorepo forged successfully! (${totalFiles} files created)${colors.reset}\n`);
        console.log(`${colors.bold}Next Steps:${colors.reset}`);
        console.log(`  ${colors.cyan}cd ${projectName}${colors.reset}`);
        console.log(`  ${colors.cyan}${config.packageManager} install${colors.reset}`);
        console.log(`  ${colors.cyan}${config.packageManager} run dev${colors.reset}\n`);
        console.log(`${colors.gray}Enjoy high-speed shipping with Turboforge & Turborepo! 🚀${colors.reset}\n`);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        log.error(`Failed to generate monorepo: ${message}`);
        process.exit(1);
      });
    return;
  }

  log.warn(`Unknown command '${command}'`);
  printHelp();
}

function parseFlags(flags: string[]) {
  const options: {
    template?: TemplateType;
    backend?: BackendType;
    database?: DatabaseType;
    packageManager?: PackageManager;
    includeMcpServer?: boolean;
    includeAgentsRules?: boolean;
    gitInit?: boolean;
  } = {};

  for (let i = 0; i < flags.length; i++) {
    const flag = flags[i];
    if (flag === '--template' && flags[i + 1]) {
      options.template = flags[++i] as TemplateType;
    } else if (flag === '--backend' && flags[i + 1]) {
      options.backend = flags[++i] as BackendType;
    } else if (flag === '--database' && flags[i + 1]) {
      options.database = flags[++i] as DatabaseType;
    } else if (flag === '--pm' && flags[i + 1]) {
      options.packageManager = flags[++i] as PackageManager;
    } else if (flag === '--no-mcp') {
      options.includeMcpServer = false;
    } else if (flag === '--no-agents') {
      options.includeAgentsRules = false;
    } else if (flag === '--no-git') {
      options.gitInit = false;
    }
  }

  return options;
}

function printHelp(): void {
  console.log(`
${colors.bold}USAGE:${colors.reset}
  $ turboforge <command> [project-name] [options]

${colors.bold}COMMANDS:${colors.reset}
  ${colors.cyan}init, create <name>${colors.reset}    Forge a new monorepo in a new folder
  ${colors.cyan}templates, list-templates${colors.reset}  List available monorepo architectures
  ${colors.cyan}doctor${colors.reset}                   Check system environment (Node, git, pms)
  ${colors.cyan}help, --help${colors.reset}             Display this help menu

${colors.bold}OPTIONS:${colors.reset}
  ${colors.yellow}--template <type>${colors.reset}        Template type: 'saas' | 'ai-agent' | 'minimal' (default: 'saas')
  ${colors.yellow}--backend <type>${colors.reset}         Backend type: 'nestjs' | 'fastify' | 'none' (default: 'nestjs')
  ${colors.yellow}--database <type>${colors.reset}        Database type: 'supabase' | 'postgresql' | 'none' (default: 'supabase')
  ${colors.yellow}--pm <manager>${colors.reset}           Package manager: 'pnpm' | 'npm' | 'yarn' | 'bun' (default: 'pnpm')
  ${colors.yellow}--no-mcp${colors.reset}                Skip MCP server stub
  ${colors.yellow}--no-agents${colors.reset}             Skip AI agent rules (.agents/ + .cursorrules)
  ${colors.yellow}--no-git${colors.reset}                Skip git repository initialization

${colors.bold}EXAMPLES:${colors.reset}
  $ turboforge init my-saas
  $ turboforge init my-agent-platform --template ai-agent
  $ turboforge doctor
`);
}

function printTemplates(): void {
  console.log(`
${colors.bold}Available Turboforge Architectures:${colors.reset}

  ${colors.cyan}1. saas (Default)${colors.reset}
     ├── apps/web: Next.js 15 App Router, Tailwind CSS, Lucide icons
     ├── apps/api: NestJS modular REST API with health endpoints
     ├── apps/mcp-server: Model Context Protocol (MCP) tool server
     └── packages/: @repo/ui, @repo/tsconfig, @repo/database (Supabase schema + RLS)

  ${colors.cyan}2. ai-agent${colors.reset}
     ├── apps/web: Next.js Agent Studio with live execution feed UI
     ├── apps/mcp-server: Full MCP SDK server ready for Claude/Windsurf
     └── packages/: @repo/ui, @repo/tsconfig, .agents/RULES.md

  ${colors.cyan}3. minimal${colors.reset}
     ├── apps/web: Next.js App Router starter
     └── packages/: @repo/ui button primitives, @repo/tsconfig
`);
}

