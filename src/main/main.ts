import { app, BrowserWindow, Menu } from 'electron';
import { is } from 'electron-util';
import unhandled from 'electron-unhandled';
import debug from 'electron-debug';
import contextMenu from 'electron-context-menu';
import { autoUpdater } from 'electron-updater';
import { join } from 'path';
import menu from './menu';
import init from './init';

unhandled();
debug();
contextMenu();

// Checks if the given error is a network error.
// https://github.com/electron-userland/electron-builder/issues/2398#issuecomment-413117520
function isNetworkError(errorObject: Error): boolean {
  return (
    errorObject.message === 'net::ERR_INTERNET_DISCONNECTED' ||
    errorObject.message === 'net::ERR_PROXY_CONNECTION_FAILED' ||
    errorObject.message === 'net::ERR_CONNECTION_RESET' ||
    errorObject.message === 'net::ERR_CONNECTION_CLOSE' ||
    errorObject.message === 'net::ERR_NAME_NOT_RESOLVED' ||
    errorObject.message === 'net::ERR_CONNECTION_TIMED_OUT'
  );
}

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require, import/no-extraneous-dependencies
  require('electron-reloader')(module);
  // eslint-disable-next-line no-empty
} catch (_) {}

// Note: Must match `build.appId` in package.json
app.setAppUserModelId('com.company.AppName');

if (!is.development) {
  try {
    const FOUR_HOURS = 1000 * 60 * 60 * 4;
    setInterval(() => {
      autoUpdater.checkForUpdates();
    }, FOUR_HOURS);
    autoUpdater.checkForUpdates();
  } catch (err) {
    // Ignore network errors.
    if (!isNetworkError(err)) {
      throw err;
    }
  }
}

// Prevent window from being garbage collected
let mainWindow: BrowserWindow | null = null;
const rootDir = join(__dirname, '../../');

const createMainWindow = async () => {
  const win = new BrowserWindow({
    title: app.name,
    show: false,
    width: 600,
    height: 400,
    webPreferences: {
      preload: join(rootDir, 'template/preload.js'),
      enableRemoteModule: true,
    },
  });

  win.on('ready-to-show', () => {
    win.show();
  });

  win.on('closed', () => {
    // Dereference the window
    // For multiple windows store them in an array
    mainWindow = null;
  });
  await win.loadFile(join(rootDir, 'template/main.html'));

  return win;
};

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

app.on('window-all-closed', () => {
  if (!is.macos) {
    app.quit();
  }
});

app.on('activate', async () => {
  if (!mainWindow) {
    mainWindow = await createMainWindow();
  }
});

(async () => {
  await app.whenReady();
  Menu.setApplicationMenu(menu);
  mainWindow = await createMainWindow();

  init();
})();
