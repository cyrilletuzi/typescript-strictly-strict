# TypeScript Strictly Typed

Enable configurations for strictly typed TypeScript, ESLint or TSLint, and optionally Angular.
Because TypeScript `strict` mode is not enough.

A [blog post](https://medium.com/@cyrilletuzi/typescript-strictly-typed-strict-mode-is-not-enough-40df698e2deb?source=friends_link&sk=00f968af095e7615f7220314df280a1b)
explains the motivation of this lib.

## Warning

Going fully strict is a choice to make at the *very beginning* of a project.

**Enabling all strict options at once in an existing project is strongly discouraged**,
as hundred of errors would appear. Converting an existing project to full strict mode is still possible,
but it should be done *incrementally*, by activating each option *one by one*.

On the other hand, it's recommended to redo the command when doing major updates of your tools
(TypeScript, ESLint or Angular) to add newly introduced strict options,
to stay up to date on best practices.

## Getting started

```bash
cd path/to/my-project
npx typescript-strictly-typed
```

`npx` is a command included in Node/npm. In case of problem
(there is a [known issue](https://github.com/npm/npx/issues/6)
with `npx` on Windows if your user path contains a space, like `C:\Users\Hello World`),
just do the full commands:

```bash
cd path/to/my-project
npm install typescript-strictly-typed -g
typescript-strictly-typed
```

## What does it do?

Adding configuration for:

- [TypeScript compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
  - `strict` (which includes in particular `noImplicitAny` and `strictNullChecks`)
  - `noFallthroughCasesInSwitch`
  - `noImplicitReturns`
  - `noPropertyAccessFromIndexSignature`
  - `forceConsistentCasingInFileNames`
  - `noImplicitOverride`
  - `exactOptionalPropertyTypes`
- [ESLint rules](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)
  - `@typescript-eslint/no-explicit-any`
  - `@typescript-eslint/explicit-module-boundary-types`
- [TSLint rules](https://palantir.github.io/tslint/rules/)
  - `no-any`
  - `typedef` with `call-signature`
- [Angular compiler options](https://angular.io/guide/angular-compiler-options)
  - `strictInjectionParameters`
  - `strictTemplates`
  - `strictInputAccessModifiers`
- [Angular ESLint options](https://github.com/angular-eslint/angular-eslint)
  - `@angular-eslint/template/no-any`
- [Angular Codelyzer lint options](http://codelyzer.com/rules/)
  - `template-no-any`

## By the same author

- [Angular schematics extension for VS Code](https://marketplace.visualstudio.com/items?itemName=cyrilletuzi.angular-schematics) (GUI for Angular CLI commands)
- [@ngx-pwa/local-storage](https://github.com/cyrilletuzi/angular-async-local-storage): Angular library for local storage
- Popular [Angular posts on Medium](https://medium.com/@cyrilletuzi)
- Follow updates of this lib on [Twitter](https://twitter.com/cyrilletuzi)
- **[Angular onsite trainings](https://formationjavascript.com/formation-angular/)** (based in Paris, so the website is in French, but [my English bio is here](https://www.cyrilletuzi.com/en/) and I'm open to travel)

My open source contributions are done on *free* time.
So if your company earns money with them,
it would be nice to **consider becoming [a sponsor](https://github.com/sponsors/cyrilletuzi)**.

## Requirements

### Node & npm

You need a LTS version of Node and npm, ie. currently:
- Node >= 12.13
- npm >= 6.12

### Directory

Be sure to invoke the command in the *root* directory of your project,
ie. where your configuration files (like `tsconfig.json`) are located.

### TypeScript

`strict` mode is available in TypeScript >= 2.3.

### ESLint

ESLint must be configured for TypeScript, ie. with:
- `"parser": "@typescript-eslint/parser"` and `"plugins": ["@typescript-eslint"]`
- or an equivalent (for example Vue uses `"extends": ["@vue/typescript"]` and React uses `"extends": "react-app"`)

[Official getting started documentation of `@typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)

### Angular

The project must use a LTS version of Angular CLI, ie. with a `angular.json` file.

## Known limitations

This lib is here to promote good practices. But at the end of the day,
it just adds a few lines in configuration files, as explained above in "What does it do?".

It was already a lot of work to support all possible official configuration formats.
So if it doesn't work for your project because of a custom configuration,
you can just modify the configuration files yourself.

### Apps using `.eslintrc.js` (including Vue)

If your project uses a `.eslintrc`*`.js`* file (instead of a more classic `.eslintrc`*`.json`* file)
you'll have to copy the strict rules newly generated in `.eslintrc`*`.json`* file
into the existing `.eslintrc`*`.js`* file.

For Vue apps created with `vue create`, after running this lib command,
it will work out of the box if you chose one of the following Vue options:
- ESLint with config stored **in package.json**
- TSLint

But if you chose ESLint with *a dedicated config file*,
Vue will create a `.eslintrc`*`.js`* file and so you'll have to do the above step.

See [issue #3](https://github.com/cyrilletuzi/typescript-strictly-typed/issues/3)
if you want to help.

### Changelog

[Changelog available here](./CHANGELOG.md).

## License

MIT
