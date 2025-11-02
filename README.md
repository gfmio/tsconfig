# @gfmio/tsconfig

Shared [TypeScript](https://www.typescriptlang.org/) compiler configurations for maximum type safety and compatibility across JavaScript and TypeScript projects.

**36 specialized configs** covering Node.js, browsers, frameworks (React, Vue, Svelte, Angular, etc.), runtimes (Bun, Deno, Workers), test frameworks, and more.

## Features

- 🔒 **Maximum type safety** - Strict mode enabled with all safety checks
- 🎯 **Framework-specific** - Optimized configs for React, Vue, Angular, Svelte, Solid, Qwik, Next.js, Remix, Astro, and more
- ⚡ **Runtime-ready** - Node.js, Bun, Deno, Cloudflare Workers, Vercel Edge
- 🧪 **Test framework support** - Vitest, Jest, Mocha, AVA, Bun Test
- 📦 **Library-friendly** - Configs for npm packages with proper declaration generation
- 🏗️ **Monorepo optimized** - Project references and incremental builds
- 🎓 **Gradual adoption** - Minimal strict mode for migrating JavaScript projects

## Installation

```bash
npm install --save-dev @gfmio/tsconfig typescript
```

```bash
yarn add --dev @gfmio/tsconfig typescript
```

```bash
pnpm add --save-dev @gfmio/tsconfig typescript
```

```bash
bun add --dev @gfmio/tsconfig typescript
```

## Quick Start

### For Node.js Projects

Create a `tsconfig.json` file in your project root:

```json
{
  "extends": "@gfmio/tsconfig/node.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

### For React Applications

```json
{
  "extends": "@gfmio/tsconfig/react.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

### For Libraries (npm packages)

```json
{
  "extends": "@gfmio/tsconfig/library.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

## Available Configurations

### Base & Utilities

- **`base.json`** - Maximum strictness base configuration (extends all others)
- **`strict-minimal.json`** - Minimal strictness for gradual TypeScript adoption
- **`checkjs.json`** - Enable JavaScript type checking

### Node.js Runtimes

- **`node.json`** - General Node.js projects (NodeNext module resolution)
- **`node-esm.json`** - Explicit ESM-only Node.js
- **`node-cjs.json`** - Legacy CommonJS Node.js
- **`node-lts.json`** - Optimized for Node.js LTS (currently v20)

### Alternative Runtimes

- **`bun.json`** - Bun runtime
- **`deno.json`** - Deno runtime

### Project Types

- **`app.json`** - General web applications
- **`browser.json`** - Browser-only projects
- **`library.json`** - npm libraries with tsc compilation
- **`library-bundler.json`** - npm libraries using bundlers (tsup, unbuild)
- **`monorepo.json`** - Monorepo projects with project references

### Frontend Frameworks

- **`react.json`** - React applications
- **`preact.json`** - Preact applications
- **`vue.json`** - Vue.js applications
- **`svelte.json`** - Svelte applications
- **`solid.json`** - SolidJS applications
- **`qwik.json`** - Qwik applications
- **`angular.json`** - Angular applications
- **`lit.json`** - Lit web components
- **`next.json`** - Next.js applications
- **`remix.json`** - Remix applications
- **`astro.json`** - Astro projects

### Test Frameworks

- **`test.vitest.json`** - Vitest
- **`test.jest.json`** - Jest
- **`test.mocha.json`** - Mocha
- **`test.ava.json`** - AVA
- **`test.bun.json`** - Bun test runner

### Workers & Edge Runtimes

- **`webworker.json`** - Web Workers
- **`sharedworker.json`** - Shared Workers
- **`serviceworker.json`** - Service Workers
- **`cloudflare-workers.json`** - Cloudflare Workers
- **`vercel-edge.json`** - Vercel Edge Runtime

### Electron

- **`electron-main.json`** - Electron main process
- **`electron-renderer.json`** - Electron renderer process

## Configuration Details

### Base Configuration Philosophy

The `base.json` configuration provides **maximum type safety** with:

#### Strictness Features

- ✅ `strict: true` - All strict type checking options enabled
- ✅ `exactOptionalPropertyTypes` - Exact optional property types
- ✅ `noUncheckedIndexedAccess` - Safer array/object indexing
- ✅ `noPropertyAccessFromIndexSignature` - Explicit index access
- ✅ `noImplicitOverride` - Explicit override keyword required

#### Code Quality Checks

- ✅ `noUnusedLocals` & `noUnusedParameters` - Catch unused code
- ✅ `noImplicitReturns` - All code paths must return
- ✅ `noFallthroughCasesInSwitch` - Explicit switch fallthrough
- ✅ `allowUnreachableCode: false` - No dead code

#### Module Resolution

- ✅ `moduleResolution: "bundler"` - Modern bundler-compatible resolution
- ✅ `resolvePackageJsonExports` - Respect package.json exports
- ✅ `resolvePackageJsonImports` - Respect package.json imports
- ✅ `verbatimModuleSyntax` - Explicit import/export type handling
- ✅ `isolatedModules` - Safe for single-file transpilation

#### Developer Experience

- ✅ `noErrorTruncation` - Full error messages
- ✅ `pretty: true` - Colored, formatted errors
- ✅ `skipLibCheck: true` - Fast compilation (skip lib type checking)

### Framework-Specific Optimizations

#### React (`react.json`)

- JSX automatic runtime (`react-jsx`)
- `useDefineForClassFields: true` for React 18+ compatibility
- DOM type definitions included

#### Angular (`angular.json`)

- Decorator support (`experimentalDecorators`, `emitDecoratorMetadata`)
- `useDefineForClassFields: false` for Angular compatibility
- Proper ES2022 module configuration

#### Lit (`lit.json`)

- Decorator support for Lit decorators
- `useDefineForClassFields: false` for proper class fields

#### Next.js (`next.json`)

- Next.js TypeScript plugin integration
- Incremental compilation enabled
- JSX preserve mode for Next.js compiler

### Library Configurations

#### `library.json` - Standard Library Config

- `NodeNext` module resolution for maximum compatibility
- Declaration generation enabled (`.d.ts`, `.d.ts.map`)
- Source maps for debugging
- `stripInternal: true` - Remove `@internal` items
- `removeComments: true` - Smaller package size
- `importHelpers: true` - Use tslib for smaller bundles

#### `library-bundler.json` - For Bundler-Based Libraries

- For libraries using tsup, unbuild, pkgroll, etc.
- `noEmit: true` - Bundler handles compilation
- Type checking only with declaration settings documented

### Monorepo Configuration

The `monorepo.json` config enables:

- `composite: true` - Project references support
- `incremental: true` - Faster rebuilds with `.tsbuildinfo`
- `assumeChangesOnlyAffectDirectDependencies: true` - Better watch mode performance
- Full declaration generation for cross-package type checking

### Gradual Adoption

The `strict-minimal.json` config is perfect for:

- Migrating JavaScript projects to TypeScript
- Teams learning TypeScript
- Gradual strictness adoption

Features:

- `strict: false` - Disabled for easier migration
- `noImplicitAny: false` - Allow implicit any
- `strictNullChecks: false` - Gradual null safety
- `allowJs: true` - Mix JS and TS files
- Essential safety checks still enabled

## Common Usage Patterns

### Next.js 14+ App Router

```json
{
  "extends": "@gfmio/tsconfig/next.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Monorepo Package (using pnpm/yarn workspaces)

```json
{
  "extends": "@gfmio/tsconfig/library.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declarationDir": "./dist/types"
  },
  "include": ["src/**/*"],
  "references": [
    { "path": "../other-package" }
  ]
}
```

### React + Vitest

Create two configs:

**`tsconfig.json`** (app code):

```json
{
  "extends": "@gfmio/tsconfig/react.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

**`tsconfig.test.json`** (tests):

```json
{
  "extends": "@gfmio/tsconfig/test.vitest.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["tests/**/*", "src/**/*.test.ts", "src/**/*.test.tsx"]
}
```

Then reference it in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
})
```

### Express API Server

```json
{
  "extends": "@gfmio/tsconfig/node.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Cloudflare Workers

```json
{
  "extends": "@gfmio/tsconfig/cloudflare-workers.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

## Extending Configurations

All configurations can be extended and customized:

```json
{
  "extends": "@gfmio/tsconfig/react.json",
  "compilerOptions": {
    // Override or add options
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    },
    "target": "ES2020" // Override if needed
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

## Migration Guide

### From JavaScript to TypeScript

1. Start with `strict-minimal.json`:

```json
{
  "extends": "@gfmio/tsconfig/strict-minimal.json",
  "include": ["src/**/*"]
}
```

2. Add `// @ts-check` to JS files to enable gradual checking

3. Rename files `.js` → `.ts` one at a time

4. Fix type errors as they appear

5. Gradually enable strict options:

```json
{
  "extends": "@gfmio/tsconfig/strict-minimal.json",
  "compilerOptions": {
    "noImplicitAny": true,  // Enable when ready
    "strictNullChecks": true // Enable when ready
  }
}
```

6. Eventually migrate to full `base.json` or appropriate config

### From Loose to Strict TypeScript

If you have an existing TypeScript project with loose settings:

1. Extend the appropriate config (e.g., `node.json`, `react.json`)

2. Use compiler option overrides to temporarily disable strict checks:

```json
{
  "extends": "@gfmio/tsconfig/react.json",
  "compilerOptions": {
    // Temporarily disable while fixing
    "noUncheckedIndexedAccess": false,
    "exactOptionalPropertyTypes": false
  }
}
```

3. Fix errors for one strict option at a time

4. Remove overrides once fixed

## Tips & Best Practices

### Path Aliases

All bundler-mode configs support path aliases:

```json
{
  "extends": "@gfmio/tsconfig/react.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Make sure your bundler (Vite, Webpack, etc.) is configured with the same aliases.

### Incremental Compilation

For faster rebuilds, add:

```json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./.tsbuildinfo"
  }
}
```

Add `.tsbuildinfo` to `.gitignore`.

### Project References (Monorepos)

For monorepos, use project references:

```json
{
  "extends": "@gfmio/tsconfig/monorepo.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  },
  "references": [
    { "path": "../shared" },
    { "path": "../utils" }
  ]
}
```

Then build with:

```bash
tsc --build
```

### Library Package.json Setup

When using `library.json`, configure your `package.json`:

```json
{
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@gfmio/tsconfig": "*",
    "typescript": "^5.0.0"
  }
}
```

## Editor Integration

### VS Code

TypeScript support is built-in. For the best experience:

1. Install the workspace TypeScript version:

```json
// .vscode/settings.json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

2. Enable error reporting:

```json
{
  "typescript.validate.enable": true,
  "javascript.validate.enable": false
}
```

### Other Editors

- **WebStorm/IntelliJ**: Built-in TypeScript support
- **Neovim**: Use `typescript-language-server` via LSP
- **Sublime Text**: Use LSP-typescript
- **Vim**: Use CoC with `coc-tsserver`

## CI/CD Integration

### Type Checking in CI

```yaml
# .github/workflows/typecheck.yml
name: Type Check

on: [push, pull_request]

jobs:
  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run typecheck
```

Add to `package.json`:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

## Troubleshooting

### "Cannot find module" errors

1. Check `moduleResolution` setting matches your environment
2. Ensure `resolvePackageJsonExports: true` for modern packages
3. Install `@types/*` packages for dependencies without types

### "allowImportingTsExtensions" errors

If you see errors about importing `.ts` files:

- This is intentional for configs that emit files (`library.json`, `node.json`)
- For bundler-based projects, use configs like `app.json` or `library-bundler.json`

### Declaration generation issues

If declarations aren't being generated:

1. Ensure `noEmit: false` in your config
2. Check `declaration: true` is set
3. Verify `outDir` is configured
4. Make sure you're using a config that emits (not `base.json`)

### Strict mode too aggressive

Use `strict-minimal.json` or selectively disable strict options:

```json
{
  "extends": "@gfmio/tsconfig/node.json",
  "compilerOptions": {
    "noUncheckedIndexedAccess": false
  }
}
```

## Requirements

- TypeScript `^5.0.0` or later
- Node.js 16+ (for development)

## Philosophy

This configuration follows these principles:

1. **Safety first** - Maximum type safety by default
2. **Framework-aware** - Optimized configs for specific use cases
3. **Modern standards** - Latest TypeScript features and module resolution
4. **Developer experience** - Clear errors, fast compilation
5. **Flexibility** - Easy to extend and customize
6. **Gradual adoption** - Path from JavaScript to strict TypeScript

## License

[MIT](LICENSE)

## Author

Frédérique Mittelstaedt ([npm@gfm.io](mailto:npm@gfm.io))

## Contributing

Issues and pull requests are welcome! This is a personal configuration, but suggestions for improvements are appreciated.

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Total TypeScript](https://www.totaltypescript.com/)
