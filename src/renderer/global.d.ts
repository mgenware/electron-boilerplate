import * as electron from 'electron';

declare global {
  interface Window {
    ipcRenderer: electron.IpcRenderer;
  }
}
