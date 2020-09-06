/* eslint-disable func-names */
import * as assert from 'assert';
import * as nodepath from 'path';
import { Application } from 'spectron';

let electronPath = nodepath.join(
  __dirname,
  '..',
  'node_modules',
  '.bin',
  'electron',
);
if (process.platform === 'win32') {
  electronPath += '.cmd';
}

const appPath = nodepath.join(__dirname, '../dist_app/main/main.js');

describe('Application launch', function () {
  this.timeout(10000);

  beforeEach(async function () {
    this.app = new Application({
      path: electronPath,
      args: [appPath],
    });
    await this.app.start();
  });

  afterEach(async function () {
    if (this.app && this.app.isRunning()) {
      await this.app.stop();
    }
  });

  it('Window count', async function () {
    const count = await this.app.client.getWindowCount();
    assert.ok(count >= 1);
  });
});
