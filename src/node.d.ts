declare namespace NodeJS {
  interface Process {
    argv: string[];
    version: string;
    cwd(): string;
    exit(code?: number): never;
  }
}

declare const process: NodeJS.Process;

declare module 'node:path' {
  export function join(...paths: string[]): string;
  export function dirname(p: string): string;
  export function resolve(...paths: string[]): string;
}

declare module 'node:fs' {
  export function existsSync(p: string): boolean;
  export function mkdirSync(p: string, options?: { recursive?: boolean }): string | undefined;
  export function writeFileSync(p: string, data: string, encoding: string): void;
  export function rmSync(p: string, options?: { recursive?: boolean; force?: boolean }): void;
}

declare module 'node:child_process' {
  export function execSync(command: string, options?: { encoding?: string; stdio?: unknown }): string;
}

declare module 'node:os' {
  export function tmpdir(): string;
}

declare module 'node:test' {
  export default function test(name: string, fn: () => void | Promise<void>): void;
}

declare module 'node:assert' {
  export function ok(value: unknown, message?: string): void;
  export function strictEqual(actual: unknown, expected: unknown, message?: string): void;
}

