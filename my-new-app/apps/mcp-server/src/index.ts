/**
 * Model Context Protocol (MCP) Server for my-new-app
 * Provides contextual tools for Claude, Windsurf, and AI Agents
 */

console.log('🤖 [my-new-app-mcp] Initializing MCP Server...');

export interface AgentTool {
  name: string;
  description: string;
  execute: (params: Record<string, unknown>) => Promise<unknown>;
}

export const tools: AgentTool[] = [
  {
    name: 'inspect_workspace',
    description: 'Returns health, routes, and active packages in the my-new-app monorepo',
    execute: async () => ({
      status: 'healthy',
      apps: ['web', 'api'],
      packages: ['ui', 'tsconfig'],
    }),
  },
];
