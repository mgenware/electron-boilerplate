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
        run: ['rollup -c'],
      },
      runAndWatch: {
        run: ['electron ./dist_app/main.js', 'rollup -c -w'],
        parallel: true,
      },
      // Run build before this.
      pack: {
        run: ['electron-builder --dir'],
      },
      terser: {
        run: ['node ./scripts/terser.js'],
      },
      // Lint the project using ESLint, auto triggered by `yarn r build`.
      lint: {
        run: 'eslint --max-warnings 0 --ext .ts src integration_tests',
      },
      // Run build before this.
      'dist-mac': {
        run: ['electron-builder --macos'],
      },
      'dist-win': {
        run: ['electron-builder --windows'],
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
  // Run integration tests.
  'integration-tests': {
    alias: 'it',
    run: [
      'tsc -p ./integration_tests',
      'mocha --parallel --exit --require source-map-support/register ./dist_it/**/*.test.js',
    ],
    env: {
      NODE_ENV: 'production',
    },
  },
  // Clean, lint, compile source files and run tests.
  build: {
    run: ['#prepare', '#prepare-build', '#compile', '#lint', '#terser'],
    env: {
      NODE_ENV: 'production',
    },
  },
  'build-dist-mac': {
    alias: 'b-mac',
    run: ['#build', '#dist-mac', '#it'],
    env: {
      NODE_ENV: 'production',
    },
  },
  'build-dist-win': {
    alias: 'b-win',
    run: ['#build', '#dist-win', '#it'],
    env: {
      NODE_ENV: 'production',
    },
  },
  'build-pack': {
    alias: 'b-pack',
    run: ['#build', '#pack'],
    env: {
      NODE_ENV: 'production',
    },
  },
};
