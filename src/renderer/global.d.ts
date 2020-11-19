/* eslint-disable import/no-extraneous-dependencies */
import * as electron from 'electron';

declare global {
  interface Window {
    ipcRenderer: electron.IpcRenderer;
    electronShell: electron.Shell;
  }
}
