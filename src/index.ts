import * as path from 'path';
import * as fs from 'fs';
import * as json5 from 'json5';

interface TSConfig {
  compilerOptions?: {
    strict?: boolean;
    strictPropertyInitialization?: boolean;
  };
}

interface TSConfigAngular extends TSConfig {
  angularCompilerOptions?: {
    fullTemplateTypeCheck?: boolean;
    strictInjectionParameters?: boolean;
    strictTemplates?: boolean;
  };
}

interface TSLint {
  rules?: {
    "no-any"?: boolean;
    typedef?: boolean | [true, ...string[]];
  };
}

interface ESLint {
  rules?: {
    "@typescript-eslint/no-explicit-any"?: ['error'];
    "@typescript-eslint/explicit-function-return-type"?: ['error'];
  };
}

function checkConfig(file: string): boolean {

  const filePath = path.join(__dirname, file);

  return fs.existsSync(filePath);

}

function getConfig<T>(file: string): T | null {

  const filePath = path.join(__dirname, file);

  const configRaw = fs.readFileSync(filePath, { encoding: 'utf8' });

  let configParsed = null;
  try {
    configParsed = json5.parse(configRaw) as T;
  } catch {
    console.log(`Can't parse ${file}. Check the file syntax is valid.`);
  }

  return configParsed;

}

function saveConfig(file: string, config: unknown): boolean {

  const filePath = path.join(__dirname, file);

  // TODO: manage indentation
  const configStringified = json5.stringify(config);

  try {
    fs.writeFileSync(filePath, configStringified);
    return true;
  } catch {
    console.log(`Can't write ${file} file. Maybe a permission issue?`);
    return false;
  }

}

function enableTypeScriptStrict(): boolean {

  const file = 'tsconfig.json';

  if (!checkConfig(file)) {
    console.log(`Can't find ${file} file. Are you invoking the command from the correct directory?`);
    return false;
  }

  const config = getConfig<TSConfig>(file);
  if (!config) {
    return false;
  }

  if (!config.compilerOptions) {
    config.compilerOptions = {};
  }

  config.compilerOptions.strict = true;

  return saveConfig(file, config);

}

function enableTSLintStrict() {

  // TODO: manage tslint.yaml format
  const file = 'tslint.json';

  if (!checkConfig(file)) {
    console.log(`Can't find ${file} file. Skipping tslint configuration.`);
    return false;
  }

  const config = getConfig<TSLint>(file);
  if (!config) {
    return false;
  }

  if (!config.rules) {
    config.rules = {};
  }

  config.rules['no-any'] = true;

  if (config.rules.typedef && Array.isArray(config.rules.typedef) && !config.rules.typedef.includes('call-signature')) {
    config.rules.typedef.push('call-signature');
  } else {
    config.rules.typedef = [true, 'call-signature'];
  }

  return saveConfig(file, config);

}

function enableESLintStrict() {

  // TODO: manage other eslint configs files
  const file = '.eslintrc.json';

  if (!checkConfig(file)) {
    console.log(`Can't find ${file} file. Skipping eslint configuration.`);
    return false;
  }

  const config = getConfig<ESLint>(file);
  if (!config) {
    return false;
  }

  // TODO: check @typescript-eslint is installed and configured

  if (!config.rules) {
    config.rules = {};
  }

  config.rules['@typescript-eslint/no-explicit-any'] = ['error'];

  // TODO: check options
  config.rules['@typescript-eslint/explicit-function-return-type'] = ['error'];

  return saveConfig(file, config);

}

function enableAngularStrict({ strictPropertyInitialization = false } = {}): boolean {

  const file = 'tsconfig.json';

  const config = getConfig<TSConfigAngular>(file);
  if (!config) {
    return false;
  }

  if (!config.compilerOptions) {
    config.compilerOptions = {};
  }

  /* Strict property initialization check is an issue in Angular projects,
   * as most properties are initiliazed in `ngOnInit()` instead of `constructor()`
   * or via decorators (mainly via `@Input()`).
   * So we disable it, except if requested.
   */
  if (strictPropertyInitialization !== true) {
    config.compilerOptions.strictPropertyInitialization = false;
  }

  if (!config.angularCompilerOptions) {
    config.angularCompilerOptions = {};
  }

  /* Available in Angular >= 5 */
  config.angularCompilerOptions.fullTemplateTypeCheck = true;
  /* Available in Angular >= 5 */
  config.angularCompilerOptions.strictInjectionParameters = true;
  /* Available in Angular >= 9 */
  config.angularCompilerOptions.strictTemplates = true;

  return saveConfig(file, config);

}
