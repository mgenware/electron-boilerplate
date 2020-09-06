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

Compile, lint files, uglify files, build app, build installer, and run both unit and integration tests in production mode:

```sh
yarn r build
```
