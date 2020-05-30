module.exports = {
  _: {
    privateTasks: {
      prepare: {
        run: ['#clean', '#copyTemplate'],
      },
      copyTemplate: {
        run: 'copyfiles -f "./template/*.*" dist',
      },
      clean: {
        run: 'rimraf dist dist_tests',
      },
      runAndWatch: {
        run: ['electron ./dist/main.js', 'rollup -c -w'],
        parallel: true,
      },
    },
  },
  lint: {
    run: 'eslint --max-warnings 0 --ext .ts src',
  },
  dev: {
    run: ['#prepare', 'rollup -c', '#runAndWatch'],
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
