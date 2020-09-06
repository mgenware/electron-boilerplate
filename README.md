# fx94

Fork of [electron-boilerplate](https://github.com/sindresorhus/electron-boilerplate) with the following changes:

- Rewritten in TypeScript
- Bundles and compiles renderer process code with [rollup](https://github.com/rollup/rollup)
- Lints files with [eslint-typescript](https://github.com/typescript-eslint/typescript-eslint)
- Uglifies JavaScript files in production mode via [terser](https://github.com/terser/terser)
- Watches source files in dev mode and auto reloads electron
- Testing support
  - Unit tests for main process
  - Integration tests via [spectron](https://github.com/electron-userland/spectron)
- Migrated `package.json` scripts to [daizong](https://github.com/mgenware/daizong)

## Usage

> This project uses [daizong](https://github.com/mgenware/daizong) to manage scripts. You need to run scripts through daizong via `yarn r <script>` or `npm run r <script>`.

Start dev build, watch files and run electron:

```sh
yarn r dev
```

Compile, lint files, run tests and uglify files in production mode (note that this doesn't start any electron-builder work, it simply generates compiled JavaScript files to `ts_out` directory):

```sh
yarn r build
```

Build and run electron-builder `dist` script:

```sh
yarn r build-dist
# or yarn r b-dist
```

## Run tests

Run unit tests:

```sh
yarn r unit-tests
# or yarn r ut
```

Run spectron integration tests:

```sh
yarn r integration-tests
# or yarn r it
```
