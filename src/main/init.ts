import { ipcMain } from 'electron-better-ipc';
import { rendererFuncs } from '../common/ipcNames';

export default function init() {
  ipcMain.answerRenderer(rendererFuncs.fileDrop, (filePath) => {
    // eslint-disable-next-line no-console
    console.log(`File drop "${filePath}"`);
  });
}
