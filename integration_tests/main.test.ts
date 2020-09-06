import * as assert from 'assert';
import * as nodepath from 'path';
import { Application } from 'spectron';

var electronPath = nodepath.join(
  __dirname,
  '..',
  'node_modules',
  '.bin',
  'electron',
);
if (process.platform === 'win32') {
  electronPath += '.cmd';
}

var appPath = nodepath.join(__dirname, '../dist_app/main/main.js');

describe('Application launch', function () {
  this.timeout(10000);

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [appPath],
    });
    return this.app.start();
  });

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('Window count', async function () {
    const count = await this.app.client.getWindowCount();
    assert.ok(count >= 1);
  });
});
