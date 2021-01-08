/* eslint-disable func-names */
import * as assert from 'assert';
import { Application } from 'spectron';
import { existsSync } from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json');

describe('Application launch', function () {
  // Set 10 secs as timeout.
  this.timeout(10000);

  let appPath = '';
  const { platform } = process;
  if (platform === 'win32') {
    appPath = `./dist/win-unpacked/${pkg.productName}.exe`;
  } else if (platform === 'darwin') {
    appPath = `./dist/mac/${pkg.productName}.app/Contents/MacOS/${pkg.productName}`;
  }
  if (!appPath) {
    throw new Error(`Unexpected empty app path on platform ${platform}`);
  }
  if (!existsSync(appPath)) {
    throw new Error(
      `App file "${appPath}" not found, please build the project before running tests`,
    );
  }

  beforeEach(async function () {
    this.app = new Application({
      path: appPath,
    });
    await this.app.start();
  });

  afterEach(async function () {
    const app = this.app as Application;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (app && app.isRunning()) {
      await app.stop();
    }
  });

  it('Window count', async function () {
    const app = this.app as Application;
    const count = await app.client.getWindowCount();
    assert.equal(count, 1);
  });

  it('Main view', async function () {
    const app = this.app as Application;
    const element = await app.client.$('hello-view');
    assert.ok(await element.isDisplayed());
  });
});
