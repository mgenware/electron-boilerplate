module.exports = {
  _: {
    privateTasks: {
      prepare: {
        run: ['#clean'],
      },
      clean: {
        run: 'rimraf dist dist_tests',
      },
      compile: {
        run: ['tsc --project tsconfig-main.json --incremental', 'rollup -c'],
      },
      runAndWarch: {
        run: [
          'electron ./dist/main/main.js',
          'tsc --project tsconfig-main.json --incremental --watch',
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
};
