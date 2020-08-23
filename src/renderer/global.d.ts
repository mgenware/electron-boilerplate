/* eslint-disable import/no-extraneous-dependencies */
import { RendererProcessIpc } from 'electron-better-ipc';
import * as electron from 'electron';

declare global {
  interface Window {
    ipcRenderer: RendererProcessIpc;
    electronShell: electron.Shell;
  }
}
