# fx94

Fork of [electron-boilerplate](https://github.com/sindresorhus/electron-boilerplate) with the following changes:

- Rewritten in TypeScript
- Bundles and compiles renderer process code with [rollup](https://github.com/rollup/rollup)
- Compiles main process code and test project with TypeScript project references
- Lints files with [eslint-typescript](https://github.com/typescript-eslint/typescript-eslint)
- Uglifies JavaScript files in production mode via [terser](https://github.com/terser/terser)
- Watches source files in dev mode and auto reloads electron
- Added lit-element
- Migrated `package.json` scripts to [daizong](https://github.com/mgenware/daizong)

### Usage

> This project uses [daizong](https://github.com/mgenware/daizong) to manage scripts. You need to run scripts through daizong via `yarn r <script>` or `npm run r <script>`.

Start dev build, watch files and run electron:

```sh
yarn r dev
```

Compile, lint files, run tests and uglify files in production mode (note that this doesn't start any electron-builder work, it simply generates compiled JavaScript files to `ts_out` directory):

```sh
yarn r build
```

Run tests during development (when `yarn r dev` is running):

```sh
yarn r t
```

Lint project files:

```sh
yarn r lint
```

Build and run electron-builder `dist` script:

```sh
yarn r build-dist
# or yarn r b-dist
```
