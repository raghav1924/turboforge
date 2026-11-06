export const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  bgCyan: '\x1b[46m\x1b[30m',
  bgGreen: '\x1b[42m\x1b[30m',
  bgMagenta: '\x1b[45m\x1b[30m',
};

export const log = {
  brand: (text: string) => console.log(`${colors.bold}${colors.cyan}${text}${colors.reset}`),
  info: (msg: string) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg: string) => console.log(`${colors.green}✔${colors.reset} ${msg}`),
  warn: (msg: string) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg: string) => console.error(`${colors.red}✖${colors.reset} ${msg}`),
  dim: (msg: string) => console.log(`${colors.gray}${msg}${colors.reset}`),
  step: (step: number, total: number, msg: string) =>
    console.log(`${colors.gray}[${step}/${total}]${colors.reset} ${colors.bold}${msg}${colors.reset}`),
};

export function banner() {
  console.log(`
${colors.bold}${colors.cyan}  ⚡ TURBOFORGE ${colors.reset}${colors.gray}v1.0.0${colors.reset}
${colors.dim}  Production-Grade Full-Stack Monorepo & AI Agent Scaffold${colors.reset}
${colors.gray}  ────────────────────────────────────────────────────────${colors.reset}
`);
}

