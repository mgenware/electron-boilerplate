# fx94

Fork of [electron-boilerplate](https://github.com/sindresorhus/electron-boilerplate) with the following changes:

- Rewritten in TypeScript
- Bundles and compiles renderer process code with [rollup](https://github.com/rollup/rollup)
- Compiles main process code and test project with TypeScript project references
- Lints files with [eslint-typescript](https://github.com/typescript-eslint/typescript-eslint)
- Watches source files in dev mode and auto reloads electron
- Added lit-element
- Migrated `package.json` scripts to [daizong](https://github.com/mgenware/daizong)

### Usage

> This project uses [daizong](https://github.com/mgenware/daizong) to manage scripts. You need to run scripts through daizong via `yarn r <script>` or `npm run r <script>`.

Start dev build, watch files and run electron:

```sh
yarn r dev
```

Compile, lint files and run tests:

```sh
yarn r test
```

Run tests in dev mode:

```sh
yarn r t
```

Lint files:

```sh
yarn r lint
```
