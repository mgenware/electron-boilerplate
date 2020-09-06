module.exports = {
  _: {
    privateTasks: {
      prepare: {
        run: ['#clean'],
      },
      // Delete compiled files, auto triggered by `yarn r dev` or `yarn r build`.
      clean: {
        run: {
          del: ['dist', 'dist_app', 'dist_ut', 'dist_it'],
        },
      },
      // Extra preparation step for production build.
      'prepare-build': {
        run: ['git pull'],
      },
      compile: {
        run: ['tsc --incremental -p ./tsconfig-main.json', 'rollup -c'],
        parallel: true,
      },
      runAndWatch: {
        run: [
          'electron ./dist_app/main/main.js',
          'tsc --incremental -w -p ./tsconfig-main.json',
          'rollup -c -w',
        ],
        parallel: true,
      },
    },
  },
  // Compile and watch source files in development mode.
  dev: {
    run: ['#prepare', '#compile', '#runAndWatch'],
    env: {
      NODE_ENV: 'development',
    },
  },
  // Run unit tests.
  'unit-tests': {
    alias: 'ut',
    run: [
      'tsc -p ./unit_tests',
      'mocha --exit --require source-map-support/register ./dist_ut/**/*.test.js',
    ],
  },
  // Run integration tests.
  'integration-tests': {
    alias: 'it',
    run: [
      'tsc -p ./integration_tests',
      'mocha --exit --require source-map-support/register ./dist_it/**/*.test.js',
    ],
  },
  // Clean, lint, compile source files and run tests.
  build: {
    run: [
      '#prepare',
      '#prepare-build',
      '#compile',
      '#lint',
      '#terser',
      '#ut',
      '#it',
    ],
    env: {
      NODE_ENV: 'production',
    },
  },
  // Lints the project using ESLint, auto triggered by `yarn r build`.
  lint: {
    run: 'eslint --max-warnings 0 --ext .ts src',
  },
  // Run build before this.
  pack: {
    run: ['electron-builder --dir'],
  },
  // Run build before this.
  dist: {
    run: ['electron-builder'],
  },
  // Build and run electron-builder `dist` script.
  'build-dist': {
    alias: 'b-dist',
    run: ['#build', '#dist'],
  },
  terser: {
    run: ['node ./scripts/terser.js'],
  },
};
