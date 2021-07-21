import { checkDependencyVersion, findConfig, getConfig, saveConfig } from './config-utils';

interface TSConfig {
  compilerOptions?: {
    strict?: boolean;
    noImplicitAny?: boolean;
    strictNullChecks?: boolean;
    noImplicitThis?: boolean;
    alwaysStrict?: boolean | undefined;
    strictBindCallApply?: boolean;
    strictFunctionTypes?: boolean;
    strictPropertyInitialization?: boolean;
    useUnknownInCatchVariables?: boolean;
    noFallthroughCasesInSwitch?: boolean;
    noImplicitReturns?: boolean;
    /* noUncheckedIndexedAccess?: boolean; */
    noPropertyAccessFromIndexSignature?: boolean;
    forceConsistentCasingInFileNames?: boolean;
    noImplicitOverride?: boolean;
    exactOptionalPropertyTypes?: boolean;
  };
}

/**
 * Enable the following TypeScript compiler options:
 * - `strict`
 * - `noFallthroughCasesInSwitch`
 * - `noImplicitReturns`
 * - `forceConsistentCasingInFileNames`
 * - `noImplicitOverride`
 * - `exactOptionalPropertyTypes`
 * {@link https://www.typescriptlang.org/docs/handbook/compiler-options.html}
 *
 * @param cwd Working directory path
 *
 * @returns A boolean for success or failure
 */
export default function enableTypescriptStrict(cwd: string): boolean {

  const file = findConfig(cwd, ['tsconfig.base.json', 'tsconfig.json']);

  if (!file) {
    return false;
  }

  const config = getConfig<TSConfig>(cwd, file);
  if (!config) {
    return false;
  }

  if (!config.compilerOptions) {
    config.compilerOptions = {};
  }

  config.compilerOptions.strict = true;
  config.compilerOptions.noFallthroughCasesInSwitch = true;
  config.compilerOptions.noImplicitReturns = true;
  config.compilerOptions.forceConsistentCasingInFileNames = true;

  /*
  if (checkDependencyVersion(cwd, 'typescript', '>=4.1.0')) {
    config.compilerOptions.noUncheckedIndexedAccess = true;
  }
  */

  if (checkDependencyVersion(cwd, 'typescript', '>=4.2.0')) {
    config.compilerOptions.noPropertyAccessFromIndexSignature = true;
  }

  if (checkDependencyVersion(cwd, 'typescript', '>=4.3.0')) {
    config.compilerOptions.noImplicitOverride = true;
  }

  if (checkDependencyVersion(cwd, 'typescript', '>=4.4.0')) {
    config.compilerOptions.exactOptionalPropertyTypes = true;
  }

  /* Clean up options included in strict mode */
  if (config.compilerOptions.alwaysStrict) {
    delete config.compilerOptions.alwaysStrict;
  }
  if (config.compilerOptions.noImplicitAny) {
    delete config.compilerOptions.noImplicitAny;
  }
  if (config.compilerOptions.noImplicitThis) {
    delete config.compilerOptions.noImplicitThis;
  }
  if (config.compilerOptions.strictBindCallApply) {
    delete config.compilerOptions.strictBindCallApply;
  }
  if (config.compilerOptions.strictFunctionTypes) {
    delete config.compilerOptions.strictFunctionTypes;
  }
  if (config.compilerOptions.strictNullChecks) {
    delete config.compilerOptions.strictNullChecks;
  }
  if (config.compilerOptions.strictPropertyInitialization) {
    delete config.compilerOptions.strictPropertyInitialization;
  }
  if (config.compilerOptions.useUnknownInCatchVariables) {
    delete config.compilerOptions.useUnknownInCatchVariables;
  }

  return saveConfig(cwd, file, config);

}
