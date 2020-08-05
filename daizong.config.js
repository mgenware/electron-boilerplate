module.exports = {
  _: {
    privateTasks: {
      prepare: {
        run: ['#clean'],
      },
      // Deletes compiled files, auto triggered by `yarn r dev` or `yarn r build`.
      clean: {
        run: {
          del: ['dist', 'dist_tests'],
        },
      },
      compile: {
        run: ['tsc -b tests', 'rollup -c'],
      },
      runAndWatch: {
        run: [
          'electron ./dist/main/main.js',
          'tsc -b tests -w',
          'rollup -c -w',
        ],
        parallel: true,
      },
    },
  },
  // Starts the development mode, which watches and compiles all source files including tests files.
  dev: {
    run: ['#prepare', '#compile', '#runAndWatch'],
    env: {
      NODE_ENV: 'development',
    },
  },
  // Runs tests in development mode. You can keep two terminal tabs during development, one for `yarn dev`, the other for `yarn r t`.
  t: {
    run:
      'mocha --exit --require source-map-support/register dist_tests/**/*.test.js',
  },
  // Cleans, lints, compiles sources and runs tests.
  build: {
    run: ['#prepare', '#compile', '#lint', '#t'],
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
    run: ['electron-builder --macos --linux --windows'],
  },
};
