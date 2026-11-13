import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { ScaffoldEngine } from './core/scaffold.js';
import { ProjectConfig } from './core/types.js';

test('ScaffoldEngine generates complete SaaS monorepo tree', async () => {
  const tmpDir = path.join(os.tmpdir(), `turboforge-test-${Date.now()}`);
  const config: ProjectConfig = {
    name: 'test-saas-app',
    targetDir: tmpDir,
    template: 'saas',
    backend: 'nestjs',
    database: 'supabase',
    includeMcpServer: true,
    includeAgentsRules: true,
    packageManager: 'pnpm',
    gitInit: false,
  };

  const engine = new ScaffoldEngine(config);
  const result = await engine.generate();

  assert.ok(result.totalFiles > 15, 'Should generate at least 15 files');
  assert.ok(fs.existsSync(path.join(tmpDir, 'package.json')), 'Root package.json exists');
  assert.ok(fs.existsSync(path.join(tmpDir, 'turbo.json')), 'turbo.json exists');
  assert.ok(fs.existsSync(path.join(tmpDir, 'apps/web/package.json')), 'apps/web package.json exists');
  assert.ok(fs.existsSync(path.join(tmpDir, 'apps/api/package.json')), 'apps/api package.json exists');
  assert.ok(fs.existsSync(path.join(tmpDir, 'apps/mcp-server/package.json')), 'apps/mcp-server package.json exists');
  assert.ok(fs.existsSync(path.join(tmpDir, 'packages/ui/package.json')), '@repo/ui package.json exists');
  assert.ok(fs.existsSync(path.join(tmpDir, 'packages/database/schema.sql')), 'Supabase SQL schema exists');
  assert.ok(fs.existsSync(path.join(tmpDir, '.agents/RULES.md')), 'Agent rules exist');
  assert.ok(fs.existsSync(path.join(tmpDir, '.cursorrules')), '.cursorrules exists');

  // Clean up
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('ScaffoldEngine generates minimal template correctly', async () => {
  const tmpDir = path.join(os.tmpdir(), `turboforge-min-test-${Date.now()}`);
  const config: ProjectConfig = {
    name: 'test-minimal-app',
    targetDir: tmpDir,
    template: 'minimal',
    backend: 'none',
    database: 'none',
    includeMcpServer: false,
    includeAgentsRules: false,
    packageManager: 'npm',
    gitInit: false,
  };

  const engine = new ScaffoldEngine(config);
  const result = await engine.generate();

  assert.ok(result.totalFiles >= 8, 'Minimal template should generate core workspace files');
  assert.ok(!fs.existsSync(path.join(tmpDir, 'apps/mcp-server')), 'MCP server omitted when disabled');
  assert.ok(!fs.existsSync(path.join(tmpDir, '.agents')), 'Agent rules omitted when disabled');

  // Clean up
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('ScaffoldEngine generates AI Agent preset with dedicated MCP server and agent rules', async () => {
  const tmpDir = path.join(os.tmpdir(), `turboforge-agent-test-${Date.now()}`);
  const config: ProjectConfig = {
    name: 'test-agent-suite',
    targetDir: tmpDir,
    template: 'ai-agent',
    backend: 'nestjs',
    database: 'supabase',
    includeMcpServer: true,
    includeAgentsRules: true,
    packageManager: 'pnpm',
    gitInit: false,
  };

  const engine = new ScaffoldEngine(config);
  const result = await engine.generate();

  assert.ok(result.totalFiles > 10, 'Agent template should generate workspace files');
  assert.ok(fs.existsSync(path.join(tmpDir, 'apps/mcp-server')), 'MCP server must exist for AI agent preset');
  assert.ok(fs.existsSync(path.join(tmpDir, '.agents/RULES.md')), 'AI agent guidelines must exist');

  // Clean up
  fs.rmSync(tmpDir, { recursive: true, force: true });
});
