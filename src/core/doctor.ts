import { execSync } from 'node:child_process';
import { log, colors } from '../utils/logger.js';

export function runDoctor(): void {
  console.log(`\n${colors.bold}🩺 Turboforge System Diagnostics${colors.reset}\n`);

  // 1. Node.js Check
  try {
    const nodeVer = process.version;
    const major = parseInt(nodeVer.replace('v', '').split('.')[0], 10);
    if (major >= 18) {
      log.success(`Node.js Runtime: ${colors.bold}${nodeVer}${colors.reset} (Supported >=18.0.0)`);
    } else {
      log.warn(`Node.js Runtime: ${nodeVer} (Recommend >=18.0.0)`);
    }
  } catch {
    log.error(`Node.js check failed`);
  }

  // 2. Git Check
  try {
    const gitVer = execSync('git --version', { encoding: 'utf-8' }).trim();
    log.success(`Git VCS: ${colors.bold}${gitVer}${colors.reset}`);
  } catch {
    log.warn(`Git not detected or not in PATH`);
  }

  // 3. Package Managers Check
  const pms = ['pnpm', 'npm', 'yarn', 'bun'];
  pms.forEach((pm) => {
    try {
      const ver = execSync(`${pm} --version`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
      log.success(`Package Manager [${pm}]: ${colors.bold}v${ver}${colors.reset}`);
    } catch {
      log.dim(`Package Manager [${pm}]: not installed`);
    }
  });

  console.log(`\n${colors.green}✔ System environment is ready to forge monorepos.${colors.reset}\n`);
}
