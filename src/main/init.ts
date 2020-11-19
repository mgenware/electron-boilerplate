import { ipcMain } from 'electron';
import { promises as fsPromises } from 'fs';
import calls from '../common/calls';

export default function init() {
  ipcMain.on(calls.main.openFile, async (e, arg) => {
    const path = arg as string;
    const contents = await fsPromises.readFile(path, 'utf8');
    e.reply(calls.renderer.renderContent, path, contents);
  });
}
