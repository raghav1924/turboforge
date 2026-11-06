export type TemplateType = 'saas' | 'ai-agent' | 'minimal';
export type BackendType = 'nestjs' | 'fastify' | 'none';
export type DatabaseType = 'supabase' | 'postgresql' | 'none';
export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

export interface ProjectConfig {
  name: string;
  targetDir: string;
  template: TemplateType;
  backend: BackendType;
  database: DatabaseType;
  includeMcpServer: boolean;
  includeAgentsRules: boolean;
  packageManager: PackageManager;
  gitInit: boolean;
}

export interface TemplateFile {
  path: string;
  content: string;
}

export interface TemplateDefinition {
  id: TemplateType;
  name: string;
  description: string;
  recommendedStack: string;
  generateFiles: (config: ProjectConfig) => TemplateFile[];
}
