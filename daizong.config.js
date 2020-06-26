module.exports = {
  _: {
    privateTasks: {
      prepare: {
        run: ['#clean'],
      },
      clean: {
        run: {
          del: 'dist dist_tests',
        },
      },
      compile: {
        run: ['tsc -b tests', 'rollup -c'],
      },
      runAndWarch: {
        run: [
          'electron ./dist/main/main.js',
          'tsc -b tests -w',
          'rollup -c -w',
        ],
        parallel: true,
      },
    },
  },
  lint: {
    run: 'eslint --max-warnings 0 --ext .ts src',
  },
  dev: {
    run: ['#prepare', '#compile', '#runAndWarch'],
    env: {
      NODE_ENV: 'development',
    },
  },
  pack: {
    run: 'electron-builder --dir',
  },
  dist: {
    run: 'electron-builder --macos --linux --windows',
  },
  t: {
    run: 'mocha --require source-map-support/register dist_tests/**/*.test.js',
  },
};
